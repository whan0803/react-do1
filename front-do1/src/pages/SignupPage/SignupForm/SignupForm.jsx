import style from './SignupForm.module.css'

import leftCharactor from '../../../assets/left.png'

const SignupForm = () => {
    return (
      <div className={style.SignupForm}>

        <h1 className={style.SignupTitle}>회원가입 하기</h1>

        <div className={style.formWrapper}>

          <div className={style.inputWrapper}>
            <label htmlFor="">이름</label>
            <input type="text" placeholder="이름을 입력해주세요" />
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="">이메일</label>
            <input type="text" placeholder="이메일을 입력해주세요" />
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="">비밀번호</label>
            <input type="text" placeholder="비밀번호를 입력해주세요" />
          </div>
          <div className={style.inputWrapper}>
            <label htmlFor="">생년월일</label>
            <div className={style.selectWrapper}>
            
              <select name="" id="">
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
              </select>

              <select name="" id="">
                <option value="12">12</option>
                <option value="11">11</option>
                <option value="10">10</option>
              </select>

              <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>

          <button className={style.button}>회원가입</button>
          
        </div>

        <div className={style.imgWrapper}>
          <img src={leftCharactor} alt="leftCharactor1" />
          <img src={leftCharactor} alt="leftCharactor2" />
          <img src={leftCharactor} alt="leftCharactor3" />
          <img src={leftCharactor} alt="leftCharactor4" />
        </div>

      </div>
    );
}

export default SignupForm