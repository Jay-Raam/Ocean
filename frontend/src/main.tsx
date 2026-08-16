import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import "./styles/components.css";
import "./styles/sections.css";
import "./styles/booking.css";
import App from "./App.tsx";

// NB: StrictMode is intentionally NOT used — motion 13 + React 19 breaks
// mount/enter animations (double-mount resets `initial`) with it enabled.
createRoot(document.getElementById("root")!).render(<App />);
