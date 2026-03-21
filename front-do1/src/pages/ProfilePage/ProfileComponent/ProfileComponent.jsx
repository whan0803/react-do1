import style from "./ProfileComponent.module.css";

const ProfileComponent = () => {
  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>프로필 수정</h1>

      <div className={style.divider}></div>

      <div className={style.inputGroup}>
        <label className={style.label}>닉네임</label>
        <input className={style.input} type="text" placeholder="닉네임 수정" />
      </div>

      <div className={style.divider}></div>

      <div className={style.inputGroup}>
        <label className={style.label}>이메일</label>
        <input className={style.input} type="text" placeholder="이메일 수정" />
      </div>

      <div className={style.divider}></div>

      <div className={style.inputGroup}>
        <label className={style.label}>비밀번호</label>
        <input
          className={style.input}
          type="password"
          placeholder="비밀번호 수정"
        />
      </div>

      <div className={style.divider}></div>

      <div className={style.inputGroup}>
        <label className={style.label}>생년월일</label>
        <div className={style.birthWrapper}>
          <input className={style.birthInput} type="text" />
          <input className={style.birthInput} type="text" />
          <input className={style.birthInput} type="text" />
        </div>
      </div>

      <button className={style.button}>저장</button>
    </div>
  );
};

export default ProfileComponent;
