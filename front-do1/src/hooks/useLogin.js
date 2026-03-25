import { Mutation, useMutation } from "@tanstack/react-query";
import { login } from "../api/user";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/useLoginStore";
import { setUserStore } from "../store/setUserStore";
import { userChatMessageStore } from "../store/userChatMessageStore";

export const useLogin = () => {
    const { resetLoginForm } = useLoginStore();

    const navigate = useNavigate();

    return useMutation({
        mutationFn: login,
        
        onSuccess: (res) => {
            const { setUser } = setUserStore.getState();
            const {initMessage} = userChatMessageStore.getState();
            console.log("res:", res);
            console.log("res.data:", res.data);


            resetLoginForm();

            setUser(res.data);
            
            initMessage();
            alert("로그인이 완료되었습니다");
            navigate('/mainpage');

        },
        onError: (err) => {
            console.error(err);
            alert("로그인 실패");
        }
    })
}