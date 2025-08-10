import { createRoot } from "react-dom/client";
import "./style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard } from "./pages/dashboard";
import { Charts } from "./pages/StudyBarChart";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-12 pb-12">
      <Dashboard />
    </div>
  );
};

createRoot(document.getElementById("app")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
