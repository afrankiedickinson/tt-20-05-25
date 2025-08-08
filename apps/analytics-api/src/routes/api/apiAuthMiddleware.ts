import type { Request, Response, NextFunction } from "express";

export const apiAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== "Bearer mock-header") {
    console.error(`Invalid authorization header: ${authHeader}`);

    return res.status(401).json({ error: "Unauthorized" });
  } else {
    return next();
  }
};
