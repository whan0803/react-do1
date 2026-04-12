import style from './Footer.module.css'

import home from '../../assets/home.png'
import list from '../../assets/list.png'
import calender from '../../assets/calendar.png'

import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate();

    const goCalender = () => {
        navigate("/calenderpage")
    }
    const goHome = () => {
        navigate("/mainpage");
    }
    const goList = () => {
        navigate("/listpage");
    }
    return (
        <div className={style.Footer}>
            <img src={calender} onClick={goCalender} alt="달력" loading="lazy" decoding="async" />
            <img src={home} onClick={goHome} alt="홈" loading="lazy" decoding="async" />
            <img src={list} onClick={goList} alt="리스트" loading="lazy" decoding="async" />
        </div>
    )
}

export default Footer
