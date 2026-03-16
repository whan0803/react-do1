import style from './SignupPage.module.css'

import SignupForm from './SignupForm/SignupForm'

const SignupPage = () => {
    return(
        <div className={style.SignupPage}>
            <SignupForm />
        </div>
    )
}

export default SignupPage