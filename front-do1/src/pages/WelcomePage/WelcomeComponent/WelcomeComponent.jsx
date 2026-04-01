import style from './WelcomeComponent.module.css'
import { useNavigate } from 'react-router-dom'


import mainCharactor from '../../../assets/mainCharactor.png'
import logo from '../../../assets/logo.png'

const WelcomeComponent = () => {

    const navigate = useNavigate();

    const goSignup = () => {
        navigate('./signup')
    }
    const goLogin = () => {
        navigate('./login')
    }

    return (
      <div className={style.WelcomeComponent}>
        <img
          className={style.mainCharactor}
          src={mainCharactor}
          alt="메인 캐릭터"
        />

        <div className={style.Wrapper}>
          <img src={logo} alt="logo" />
          <button className={style.button} onClick={goLogin}>로그인</button>
          <button className={style.button} onClick={goSignup}>회원가입</button>
        </div>
      </div>
    );
}

export default WelcomeComponent