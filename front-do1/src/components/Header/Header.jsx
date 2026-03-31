import style from './Header.module.css'

import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png'
import { setUserStore } from '../../store/setUserStore';

import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const {logoutUser} = setUserStore();

    const goLogout = () => {
        alert("로그아웃되었습니다");
        logoutUser();
        navigate("/")
    }

    const goProfile = () => {
        navigate('/profilepage');
    }


    return (
      <div className={style.Header}>
        <img className={style.logo} src={logo} alt="로고" />
        <div className={style.userWrapper}>
          <p onClick={goLogout}>로그아웃</p>
          <img src={profile} onClick={goProfile} alt="프로필" />
        </div>
      </div>
    );
}

export default Header