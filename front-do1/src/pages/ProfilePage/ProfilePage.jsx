import style from './ProfilePage.module.css'

import ProfileComponent from './ProfileComponent/ProfileComponent'

const ProfilePage = () => {
    return(
        <div className={style.ProfilePage}>
            <ProfileComponent />
        </div>
    )
}

export default ProfilePage