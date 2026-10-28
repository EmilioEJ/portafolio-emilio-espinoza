import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DemosApp from "./DemosApp";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DemosApp />
  </StrictMode>,
);
