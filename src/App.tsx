import reactLogo from "./assets/react.svg";
import "./App.css";
import { createTauRPCProxy } from "../bindings.ts";
import { useEffect, useState } from "react";

function App() {
  const [taurpc, setTaurpc] = useState<Awaited<
    ReturnType<typeof createTauRPCProxy>
  > | null>(null);

  useEffect(() => {
    const init = async () => {
      const taurpc = await createTauRPCProxy();
      setTaurpc(taurpc);
    };
    init();
  }, []);

  async function hello_world() {
    await taurpc?.hello_world();
  }

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
