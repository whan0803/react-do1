import style from './MainPage.module.css'

import Header from '../../components/Header/Header'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import Main from '../../components/Main/Main'
import TimerStart from '../../components/TimeStart/TimeStart'

const MainPage = () => {
    return (
      <div className={style.MainPage}>
        <div className={style.Wrapper}>
          <Header />
          <Nav />
          <div className={style.main}>
            <Main />
          </div>
          <Footer />
        </div>
      </div>
    );
}

export default MainPage