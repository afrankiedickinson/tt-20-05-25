import { useQuery } from "@tanstack/react-query";
import { getSummary } from "@/lib/api";

export const useSummary = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: () => {
      return getSummary();
    },
    refetchInterval: 30_000,
  });
};
