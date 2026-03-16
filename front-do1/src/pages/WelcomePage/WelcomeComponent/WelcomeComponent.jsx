import style from './WelcomeComponent.module.css'


import mainCharactor from '../../../assets/스크린샷 2026-03-15 212411-Photoroom 1.png'
import logo from '../../../assets/logo.png'

const WelcomeComponent = () => {
    return (
      <div className={style.WelcomeComponent}>
        <img
          className={style.mainCharactor}
          src={mainCharactor}
          alt="메인 캐릭터"
        />

        <div className={style.Wrapper}>
          <img src={logo} alt="logo" />
          <button className={style.button}>로그인</button>
          <button className={style.button}>회원가입</button>
        </div>
      </div>
    );
}

export default WelcomeComponent