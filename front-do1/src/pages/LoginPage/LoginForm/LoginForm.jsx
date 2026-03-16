import style from './LoginForm.module.css'

import loginCharactor from '../../../assets/loginCharactor.png'

const LoginForm = () => {
    return (
      <div className={style.LoginForm}>

        <h1 className={style.loginTitle}>로그인 하기</h1>

        <div className={style.formWrapper}>

          <div className={style.inputWrapper}>
            <label htmlFor="">메일</label>
            <input type="text" placeholder="이메일을 입력해주새요" />
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="">비밀번호</label>
            <input type="text" placeholder="비밀번호를 입력해주세요" />
          </div>

          <button className={style.button}>로그인</button>

        </div>
        
        <img className={style.img} src={loginCharactor} alt="" />
      </div>
    );
}

export default LoginForm