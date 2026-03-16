import style from './LoginPage.module.css'

import LoginForm from "./LoginForm/LoginForm"

const LoginPage = () => {
    return(
        <div className={style.LoginPage}>
            <LoginForm />
        </div>
    )
}

export default LoginPage