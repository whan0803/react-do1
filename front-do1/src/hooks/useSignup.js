import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/user";
import { useNavigate } from "react-router-dom";
import { useSignupStore } from "../store/useSignupStore";

export const useSignup = () => {
    const {resetSignupForm} = useSignupStore();

    const navigate = useNavigate();
    return useMutation({
        mutationFn: signup,

        onSuccess: () => {
            console.log("회원가입성공");
            alert("회원가입이 성공적으로 완료되었습니다");
            resetSignupForm();
            navigate('/');
        },

        onError: (err) => {
            console.error(err);
            alert("회원가입 실패");
        }
    })
}