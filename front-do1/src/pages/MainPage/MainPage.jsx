import style from './MainPage.module.css'

import Header from '../../components/Header/Header'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import defaultChar from '../../assets/default.png'

const MainPage = () => {
    return (
      <div className={style.MainPage}>
        <div className={style.Wrapper}>
          <Header />
          <Nav />
          <main className={style.main}>
            <div className={style.characterBox}>
              <div className={style.bubble}>
                <h2>안녕하세요!</h2>
              </div>
              <img src={defaultChar} alt="" />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
}

export default MainPage