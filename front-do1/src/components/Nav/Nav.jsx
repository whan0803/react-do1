import { useGetMissionStore } from '../../store/useMissionStore'

import style from './Nav.module.css'
const Nav = () => {
    const {remainingTime, day} = useGetMissionStore();
    

    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
    const seconds = String(remainingTime % 60).padStart(2, "0");

    return(
        <div className={style.Nav}>
            <h3>다음 미션까지 {minutes}:{seconds}</h3>
            <h2>미션한지 {day}일째</h2>
        </div>
    )
}

export default Nav