import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Setup } from "./Setup";

const rootElement = document.getElementById("react-root");
if (!rootElement) throw new Error("React root not found");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <Setup>
    <App />
  </Setup>
);
