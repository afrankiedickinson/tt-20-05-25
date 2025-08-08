import { Router } from "express";
import { SummaryService } from "./summary.service";

export const summaryRouter = Router();

const summaryService = new SummaryService();

summaryRouter.get("/", (_, res) => {
  res.json(summaryService.report());
});
