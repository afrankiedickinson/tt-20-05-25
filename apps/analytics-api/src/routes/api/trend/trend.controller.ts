import { Router } from "express";
import { TrendService } from "./trend.service";

export const trendRouter = Router();

const trendService = new TrendService();

trendRouter.get("/", (_, res) => {
  res.json({ data: trendService.report() });
});
