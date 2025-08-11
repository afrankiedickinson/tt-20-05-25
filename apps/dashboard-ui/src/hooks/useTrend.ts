import { useQuery } from "@tanstack/react-query";
import { getTrend } from "@/lib/api";

import type { TrendParams } from "@/lib/api";

export const useTrend = (params: TrendParams) => {
  return useQuery({
    queryKey: ["trend", params],
    queryFn: () => {
      return getTrend(params);
    },
    refetchInterval: 30_000,
  });
};
