import { useMutation } from "@tanstack/react-query";
import { login } from "../api/user";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/useLoginStore";
import { setUserStore } from "../store/setUserStore";
import { userChatMessageStore } from "../store/userChatMessageStore";
import { setAccessToken } from "../utils/sessionUser";

export const useLogin = () => {
  const { resetLoginForm } = useLoginStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,

    onSuccess: (res) => {
      const { setUser } = setUserStore.getState();
      const { initMessage } = userChatMessageStore.getState();
      const user = {
        user_name: res.data.user?.user_name,
      };

      resetLoginForm();
      setAccessToken(res.data.accessToken);
      setUser(user);
      initMessage();
      alert("로그인이 완료되었습니다");
      navigate("/mainpage");
    },
    onError: (err) => {
      console.error(err);
      alert("로그인 실패");
    },
  });
};
