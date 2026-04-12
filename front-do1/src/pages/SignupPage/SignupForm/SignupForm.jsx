import style from './SignupForm.module.css'

import leftCharactor from '../../../assets/left.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../../../hooks/useSignup';
import { useSignupStore } from '../../../store/useSignupStore';


const SignupForm = () => {

    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();

        const [year, setYear] = useState(currentYear);
        const [month, setMonth] = useState(1);
        const [day, setDay] = useState(1);

  const { signupForm, setSignupForm } = useSignupStore();

    const years = Array.from({ length: 40 }, (_, i) => currentYear - i);
    const months = Array.from({length: 12}, (_, i) => i + 1);

    const dayInMonth = new Date(year, month, 0).getDate();
    const days = Array.from({length: dayInMonth}, (_, i) => i + 1);

    const onChangeSignup = (e) => {
        const { name, value } = e.target;
        setSignupForm(name, value)
    }

    const signupMutation = useSignup();
    const handleSignup = () => {
 
          const birth = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const data = {
            ...signupForm,
            user_birth: birth
        }
        signupMutation.mutate(data);
    }

    return (
      <div className={style.SignupForm}>
        <h1 className={style.SignupTitle}>회원가입 하기</h1>

        <div className={style.formWrapper}>
          <div className={style.inputWrapper}>
            <label htmlFor="">이름</label>
            <input
              type="text"
              name="user_name"
              placeholder="이름을 입력해주세요"
              value={signupForm.user_name}
              onChange={onChangeSignup}
            />
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="">이메일</label>
            <input
              type="text"
              name="user_email"
              placeholder="이메일을 입력해주세요"
              value={signupForm.user_email}
              onChange={onChangeSignup}
            />
          </div>

          <div className={style.inputWrapper}>
            <label htmlFor="">비밀번호</label>
            <input
              type="password"
              name="user_password"
              placeholder="비밀번호를 입력해주세요"
              value={signupForm.user_password}
              onChange={onChangeSignup}
            />
          </div>
          <div className={style.inputWrapper}>
            <label htmlFor="">생년월일</label>
            <div className={style.selectWrapper}>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}년
                  </option>
                ))}
              </select>

              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}월
                  </option>
                ))}
              </select>

              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
              >
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}일
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className={style.button} onClick={handleSignup}>회원가입</button>
        </div>

        <div className={style.imgWrapper}>
          <img src={leftCharactor} alt="leftCharactor1" loading="lazy" decoding="async" />
          <img src={leftCharactor} alt="leftCharactor2" loading="lazy" decoding="async" />
          <img src={leftCharactor} alt="leftCharactor3" loading="lazy" decoding="async" />
          <img src={leftCharactor} alt="leftCharactor4" loading="lazy" decoding="async" />
        </div>
      </div>
    );
}

export default SignupForm
