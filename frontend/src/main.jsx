import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "../src/components/App";
import { ImgContextProvider } from "./contexts/imgContext";
/* import { CurrentUserProvider } from "./contexts/CurrentUserContext"; */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImgContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ImgContextProvider>
  </StrictMode>,
);
