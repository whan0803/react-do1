import { useQuery } from "@tanstack/react-query";
import { getMission } from "../api/getMission";

export const useGetMission = () => {
    return useQuery({
        queryKey: ["mission"],
        queryFn: getMission,
    });
};
