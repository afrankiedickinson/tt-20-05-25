import express, { Request, Response } from "express";

const app = express();

const PORT: number = parseInt(process.env.PORT || "3001", 10);

app.use(express.json());

/**
 * Health Check Endpoint
 * @route GET /health
 * @description Responds with the server's status, uptime, and current timestamp.
 * Useful for monitoring and load balancers.
 */
app.get("/health", (req: Request, res: Response) => {
  // process.uptime() returns the number of seconds the Node.js process has been running
  const uptimeInSeconds = process.uptime();
  const uptime = {
    days: Math.floor(uptimeInSeconds / (3600 * 24)),
    hours: Math.floor((uptimeInSeconds % (3600 * 24)) / 3600),
    minutes: Math.floor((uptimeInSeconds % 3600) / 60),
    seconds: Math.floor(uptimeInSeconds % 60),
  };

  const healthCheckResponse = {
    status: "ok",
    uptime,
    timestamp: new Date().toISOString(), // ISO 8601 format in UTC
  };

  res.status(200).json(healthCheckResponse);
});

// --- SERVER STARTUP ---
app.listen(PORT, () => {
  console.log(`✅ Server is running successfully on http://localhost:${PORT}`);
  console.log(
    `API Health endpoint available at http://localhost:${PORT}/health`,
  );
});
