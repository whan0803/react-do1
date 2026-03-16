import style from './WelcomePage.module.css'
import WelcomeComponent from "./WelcomeComponent/WelcomeComponent"

const WelcomePage = () => {
    return(
        <div className={style.WelcomePage}>
            <WelcomeComponent />
        </div>
    )
}

export default WelcomePage