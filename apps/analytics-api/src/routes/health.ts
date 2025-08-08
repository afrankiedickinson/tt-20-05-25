import type { Request, Response } from "express";

/**
 * Health Check Endpoint
 * @route GET /health
 * @description Responds with the server's status, uptime, and current timestamp.
 * Useful for monitoring and load balancers.
 */
export const healthCheckEndpoint = (req: Request, res: Response) => {
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
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(healthCheckResponse);
};
