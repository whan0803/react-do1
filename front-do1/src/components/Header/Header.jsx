import style from './Header.module.css'

import logo from '../../assets/logo.png';
import profile from '../../assets/profile.png'

const Header = () => {
    return(
        <div className={style.Header}>
            <img className={style.logo} src={logo} alt="로고" />
            <img src={profile} alt="프로필" />
        </div>
    )
}

export default Header