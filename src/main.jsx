import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ContextUserProvider from "./ContextApi/ContextUserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextUserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextUserProvider>
  </StrictMode>,
);
