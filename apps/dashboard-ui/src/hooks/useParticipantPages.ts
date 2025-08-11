import { useQuery } from "@tanstack/react-query";
import { getParticipantPages } from "@/lib/api";

export const useParticipantPages = (
  params: Record<string, string>,
  options: { staleTime?: number; refetchInterval?: number } = {},
) => {
  return useQuery({
    queryKey: ["participantPages", params],
    queryFn: () => {
      return getParticipantPages(params);
    },
    refetchInterval: options.refetchInterval,
    staleTime: options.staleTime,
  });
};
