import style from "./ProfileComponent.module.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../../api/user";
import { getSessionUserId } from "../../../utils/sessionUser";
import { setUserStore } from "../../../store/setUserStore";

const ProfileComponent = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const years = useMemo(
    () => Array.from({ length: 80 }, (_, i) => currentYear - i),
    [currentYear],
  );
  const dayInMonth = new Date(year, month, 0).getDate();
  const days = useMemo(
    () => Array.from({ length: dayInMonth }, (_, i) => i + 1),
    [dayInMonth],
  );

  useEffect(() => {
    if (day > dayInMonth) setDay(dayInMonth);
  }, [year, month, dayInMonth, day]);

  useEffect(() => {
    const userId = getSessionUserId();
    if (!userId) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await getProfile({ user_id: userId });
        const data = res.data;
        setUserName(data.user_name || "");
        setUserEmail(data.user_email || "");
        if (data.user_birth) {
          const birthStr = String(data.user_birth).slice(0, 10);
          const parts = birthStr.split("-").map(Number);
          if (parts[0]) setYear(parts[0]);
          if (parts[1]) setMonth(parts[1]);
          if (parts[2]) setDay(parts[2]);
        }
      } catch (err) {
        console.error(err);
        alert("프로필을 불러오지 못했습니다");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    const userId = getSessionUserId();
    if (!userId) {
      alert("로그인이 필요합니다");
      navigate("/login");
      return;
    }

    const birth = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSaving(true);
    try {
      const res = await updateProfile({
        user_id: userId,
        user_name: userName.trim(),
        user_email: userEmail.trim(),
        user_birth: birth,
        user_password: userPassword,
      });
      const u = res.data.user;
      const { setUser } = setUserStore.getState();
      const prev = setUserStore.getState().user || {};
      setUser({
        ...prev,
        user_id: u.user_id,
        user_name: u.user_name,
        user_email: u.user_email,
      });
      setUserPassword("");
      alert(res.data.message || "저장되었습니다");
      navigate('/mainpage')
    } catch (err) {
      const msg = err?.response?.data?.message || "저장에 실패했습니다";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={style.wrapper}>
        <h1 className={style.title}>프로필 수정</h1>
        <p>불러오는 중...</p>
      </div>
    );
  }

  if (!getSessionUserId()) {
    return (
      <div className={style.wrapper}>
        <h1 className={style.title}>프로필 수정</h1>
        <p className={style.hint}>로그인 후 이용해 주세요.</p>
        <button
          type="button"
          className={style.button}
          onClick={() => navigate("/login")}
        >
          로그인
        </button>
      </div>
    );
  }

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>프로필 수정</h1>

      <div className={style.divider}></div>

      <div className={style.inputGroup}>
        <label className={style.label} htmlFor="profile-name">
          닉네임
        </label>
        <input
          id="profile-name"
          className={style.input}
          type="text"
          placeholder="닉네임"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <div className={style.divider}></div>

      <div className={style.inputGroup}>
        <label className={style.label} htmlFor="profile-email">
          이메일
        </label>
        <input
          id="profile-email"
          className={style.input}
          type="email"
          placeholder="이메일"
          autoComplete="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>

      <div className={style.divider}></div>

      <div className={style.inputGroup}>
        <label className={style.label} htmlFor="profile-password">
          비밀번호
        </label>
        <input
          id="profile-password"
          className={style.input}
          type="password"
          placeholder="변경할 때만 입력"
          autoComplete="new-password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </div>

      <div className={style.divider}></div>

      <div className={style.inputGroup}>
        <label className={style.label}>생년월일</label>
        <div className={style.birthWrapper}>
          <select
            className={style.birthSelect}
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
            className={style.birthSelect}
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
            className={style.birthSelect}
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

      <button
        type="button"
        className={style.button}
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "저장 중..." : "저장"}
      </button>
    </div>
  );
};

export default ProfileComponent;
