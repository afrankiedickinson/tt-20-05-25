import { useQuery } from "@tanstack/react-query";
import { getComparison } from "@/lib/api";

export const useComparison = () => {
  return useQuery({
    queryKey: ["comparison"],
    queryFn: () => {
      return getComparison();
    },
    refetchInterval: 30_000,
  });
};
