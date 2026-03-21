import style from './CalenderPage.module.css'
import CalenderComponent from './CalenderComponent/CalenderComponent';

const CalenderPage = () => {
    return(
        <div className={style.CalenderPage}>

            <CalenderComponent />

        </div>
    )
}

export default CalenderPage