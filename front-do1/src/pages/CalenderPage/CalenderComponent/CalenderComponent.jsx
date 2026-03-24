import style from "./CalenderComponent.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

const missionRecord = [
  {
    id: 1,
    user_id: 1,
    mission_id: 1,
    record_date: "2026-03-21",
    is_success: true,
    failure_emotion: "",
    failure_reason: "",
  },
  {
    id: 2,
    user_id: 4,
    mission_id: 3,
    record_date: "2026-03-22",
    is_success: false,
    failure_emotion: "mad",
    failure_reason: "스트레스를 받아 할 생각을 못함",
  },
  {
    id: 3,
    user_id: 4,
    mission_id: 2,
    record_date: "2026-03-23",
    is_success: false,
    failure_emotion: "normal",
    failure_reason: "까먹음",
  },
];

const CalenderComponent = () => {

  const getTileClass = ({ date, view }) => {
    if (view !== "month") return;

    const formattedDate = format(date, "yyyy-MM-dd");

    const record = missionRecord.find(
      (item) => item.record_date === formattedDate,
    );

    if (!record) return;

    return record.is_success ? style.success : style.fail;
  };


  const successCount = missionRecord.filter((item) => item.is_success).length;


  const sorted = [...missionRecord].sort(
    (a, b) => new Date(a.record_date) - new Date(b.record_date),
  );

  let streak = 0;
  let maxStreak = 0;

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].is_success) {
      streak++;
      maxStreak = Math.max(maxStreak, streak);
    } else {
      streak = 0;
    }
  }

  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.Main}>
        <Calendar className={style.calendar} tileClassName={getTileClass} />

        <div className={style.listBox}>
          <div className={style.listItem}>
            <div className={style.left}>
              <span className={style.dot}></span>
              <p className={style.label}>연속 성공</p>
            </div>
            <p className={style.value}>{maxStreak}개</p>
          </div>

          <div className={style.listItem}>
            <div className={style.left}>
              <span className={style.dot}></span>
              <p className={style.label}>총 성공 갯수</p>
            </div>
            <p className={style.value}>{successCount}개</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CalenderComponent;
