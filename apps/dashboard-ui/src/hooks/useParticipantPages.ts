import { useQuery } from "@tanstack/react-query";
import { getParticipantPages } from "@/lib/api";

export const useParticipantPages = (params: Record<string, string>) => {
  return useQuery({
    queryKey: ["participantPages", params],
    queryFn: () => {
      return getParticipantPages(params);
    },
    refetchInterval: 5000,
  });
};
