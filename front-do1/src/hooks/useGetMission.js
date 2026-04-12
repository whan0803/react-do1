import { useQuery } from "@tanstack/react-query";
import { getMission } from "../api/getMission";
import { getSessionUserId } from "../utils/sessionUser";

export const useGetMission = () => {
  const userId = getSessionUserId();

  return useQuery({
    queryKey: ["mission", userId],
    queryFn: getMission,
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
