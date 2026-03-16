import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/user";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: signup,

        onSuccess: () => {
            console.log("회원가입성공");
            alert("회원가입이 성공적으로 완료되었습니다");
            navigate('/login');
        },

        onError: () => {
            alert("회원가입 실패");
        }
    })
}