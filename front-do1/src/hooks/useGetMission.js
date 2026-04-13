import { useQuery } from "@tanstack/react-query";
import { getMission } from "../api/getMission";
import { hasAccessToken } from "../utils/sessionUser";

export const useGetMission = () => {
  return useQuery({
    queryKey: ["mission"],
    queryFn: getMission,
    enabled: hasAccessToken(),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
