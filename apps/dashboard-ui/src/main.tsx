import { createRoot } from "react-dom/client";
import "./style.css";
import Page from "./app/dashboard/page";

const App = () => <Page />;

createRoot(document.getElementById("app")!).render(<App />);
