import { Router } from "express";
import { TrendService } from "./trend.service";
import { trendParamZod } from "./trend.types";

export const trendRouter = Router();

const trendService = new TrendService();

trendRouter.get("/", (req, res) => {
  const queryParams = req.query;

  const trendQueryParams = trendParamZod.safeParse(queryParams);

  if (trendQueryParams.success) {
    res.json({
      data: trendService.calculate(trendQueryParams.data),
    });
  } else {
    res.status(400).json({ error: trendQueryParams.error });
  }
});
