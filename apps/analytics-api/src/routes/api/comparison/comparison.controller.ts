import { Router } from "express";
import { ComparisonService } from "./comparison.service";

export const comparisonRouter = Router();

const comparisonService = new ComparisonService();

comparisonRouter.get("/", (_, res) => {
  res.json({ data: comparisonService.report() });
});
