import style from './MissionPage.module.css'

import GetMission from './GetMission/GetMission'

const MissionPage = () => {
    return(
        <div className={style.MissionPage}>
            <GetMission />
        </div> 
    )
}

export default MissionPage