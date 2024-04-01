import reactLogo from "./assets/react.svg";
import "./App.css";

import useTauRPC from "./useTauRPC";

function App() {
  const taurpc = useTauRPC();

  async function hello_world() {
    await taurpc?.hello_world();
  }

  // Listen for `event` on the `events` layer
  const unlisten = taurpc?.events.event.on(() => {
    console.log("Hello World!");
  });

  unlisten?.();

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          // greet();
          hello_world();
        }}
      >
        <button type="submit">Greet</button>
      </form>

      {/* <p>{greetMsg}</p> */}
    </div>
  );
}

export default App;
