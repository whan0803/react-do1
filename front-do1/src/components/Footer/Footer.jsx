import style from './Footer.module.css'

import home from '../../assets/home.png'
import list from '../../assets/list.png'
import calender from '../../assets/calendar.png'

const Footer = () => {
    return (
        <div className={style.Footer}>
            <img src={calender} alt="달력" />
            <img src={home} alt="홈" />
            <img src={list} alt="리스트" />
        </div>
    )
}

export default Footer