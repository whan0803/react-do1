import { getMission } from "../../../backend-do1/controllers/getMission";
import { useMutation } from "@tanstack/react-query";

export const useGetMission = () => {
    return useMutation({
        mutationFn: getMission,

        onSuccess: () => {
            
        },
        onError: (err) => {
            console.error(err);
        }
    })
}