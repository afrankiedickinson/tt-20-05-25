import { Router } from "express";
import { apiAuthMiddleware } from "./apiAuthMiddleware";
import { participantsRouter } from "./participants/participants.controller";
import { summaryRouter } from "./summary/summary.controller";
import { trendRouter } from "./trend/trend.controller";

export const apiRouter = Router();

apiRouter.use(apiAuthMiddleware);

apiRouter.get("/", (_, res) => {
  res.send("200 - Authenticated");
});

apiRouter.use("/participants", participantsRouter);

apiRouter.use("/summary", summaryRouter);

apiRouter.use("/trend", trendRouter);
