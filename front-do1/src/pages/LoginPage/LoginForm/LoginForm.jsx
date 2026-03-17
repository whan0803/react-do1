import style from './LoginForm.module.css'

import loginCharactor from '../../../assets/loginCharactor.png'

import { useLoginStore } from '../../../store/useLoginStore';
import { useLogin } from '../../../hooks/useLogin';
import { signup } from '../../../api/user';

const LoginForm = () => {

  const {loginForm, setLoginForm} = useLoginStore();

  const onChangeLogin = (e) => {
    const {name, value} = e.target;

    setLoginForm(name,value);
  }

  const loginMutation = useLogin();

  const handleLogin = () => {
    const data = {
      ...loginForm,
    };
    loginMutation.mutate(data);
  }

    return (
      <div className={style.LoginForm}>
        <h1 className={style.loginTitle}>로그인 하기</h1>

        <div className={style.formWrapper}>
          <div className={style.inputWrapper}>
            <label htmlFor="">메일</label>
            <input
              type="text"
              placeholder="이메일을 입력해주새요"
              name="user_email"
              value={loginForm.user_email}
              onChange={onChangeLogin}
            />
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="">비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              name="user_password"
              value={loginForm.user_password}
              onChange={onChangeLogin}
            />
          </div>

          <button className={style.button} onClick={handleLogin}>로그인</button>
        </div>

        <img className={style.img} src={loginCharactor} alt="" />
      </div>
    );
}

export default LoginForm