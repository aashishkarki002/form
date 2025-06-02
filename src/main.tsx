import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./assets/fonts/Karla-Italic-VariableFont_wght.ttf";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App></App>
  </StrictMode>
);
