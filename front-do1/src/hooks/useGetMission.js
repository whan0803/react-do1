import { useQuery } from "@tanstack/react-query";
import { getMission } from "../api/getMission";

export const useGetMission = () => {
    const userId = sessionStorage.getItem("user_id");

    return useQuery({
        queryKey: ["mission", userId],
        queryFn: getMission,
        enabled: Boolean(userId),
    });
};
