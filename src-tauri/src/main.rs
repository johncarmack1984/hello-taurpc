// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(non_snake_case)]

use taurpc::Router;

#[taurpc::procedures]
trait Api {
    async fn hello_world();
}

#[derive(Clone)]
struct ApiImpl;

#[taurpc::resolvers]
impl Api for ApiImpl {
    async fn hello_world(self) {
        println!("Hello world");
    }
}

// Nested procedures, you can also do this (path = "api.events.users")
#[taurpc::procedures(path = "events")]
trait Events {
    #[taurpc(event)]
    async fn event();
}

#[derive(Clone)]
struct EventsImpl;

#[taurpc::resolvers]
impl Events for EventsImpl {}

#[tokio::main]
async fn main() {
    let router = Router::new()
        .merge(ApiImpl.into_handler())
        .merge(EventsImpl.into_handler());

    tauri::Builder::default()
        .invoke_handler(router.into_handler())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
