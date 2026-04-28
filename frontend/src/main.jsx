import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../src/components/App";
import { ImgContextProvider } from "./contexts/imgContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImgContextProvider>
      <App />
    </ImgContextProvider>
  </StrictMode>
);
