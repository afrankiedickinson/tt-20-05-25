import express from "express";
import { healthCheckEndpoint } from "./routes/health";
import { apiRouter } from "./routes/api/apiRouter";

const app = express();

const PORT: number = parseInt(process.env.PORT || "3001", 10);

app.use(express.json());

app.get("/health", healthCheckEndpoint);

app.use("/api/v1/", apiRouter);

app.listen(PORT, () => {
  console.log(`✅ Server is running successfully on http://localhost:${PORT}`);
  console.log(
    `API Health endpoint available at http://localhost:${PORT}/health`,
  );
});
