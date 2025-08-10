import z from "zod";
import { dateRangeZod } from "../participants/participants.type";

export const trendParamZod = z.object({
  dateRange: dateRangeZod,
});

export type TrendParam = z.infer<typeof trendParamZod>;

export interface DataPoint {
  date: string;
  value: number;
}

export interface Metric {
  name: string;
  data: DataPoint[];
}

export interface TrendResult {
  timeRange: string;
  interval: "day";
  metrics: Metric[];
}
