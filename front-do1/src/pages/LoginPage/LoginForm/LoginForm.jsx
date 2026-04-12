import style from "./LoginForm.module.css";
import loginCharactor from "../../../assets/loginCharactor.png";
import { useLoginStore } from "../../../store/useLoginStore";
import { useLogin } from "../../../hooks/useLogin";

const LoginForm = () => {
  const { loginForm, setLoginForm } = useLoginStore();
  const loginMutation = useLogin();

  const onChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginForm(name, value);
  };

  const handleLogin = () => {
    if (!loginForm.user_email || !loginForm.user_password) return;
    loginMutation.mutate({ ...loginForm });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  const isPending = loginMutation.isPending;

  return (
    <div className={style.LoginForm}>
      <h1 className={style.loginTitle}>로그인 하기</h1>

      <div className={style.formWrapper}>
        <div className={style.inputWrapper}>
          <label htmlFor="user_email">메일</label>
          <input
            id="user_email"
            type="email"
            placeholder="이메일을 입력해주세요"
            name="user_email"
            value={loginForm.user_email}
            onChange={onChangeLogin}
            onKeyDown={handleKeyDown}
            disabled={isPending}
            autoComplete="email"
          />
        </div>

        <div className={style.inputWrapper}>
          <label htmlFor="user_password">비밀번호</label>
          <input
            id="user_password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            name="user_password"
            value={loginForm.user_password}
            onChange={onChangeLogin}
            onKeyDown={handleKeyDown}
            disabled={isPending}
            autoComplete="current-password"
          />
        </div>

        {loginMutation.isError && (
          <p className={style.errorMessage}>
            {loginMutation.error?.response?.data?.message ||
              "로그인에 실패했습니다"}
          </p>
        )}

        <button
          className={style.button}
          onClick={handleLogin}
          disabled={
            isPending || !loginForm.user_email || !loginForm.user_password
          }
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>
      </div>

      <img
        className={style.img}
        src={loginCharactor}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default LoginForm;
