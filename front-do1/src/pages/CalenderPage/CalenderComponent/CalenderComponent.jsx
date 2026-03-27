import style from "./CalenderComponent.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

import { useState, useEffect } from "react";

import { getCalenderMission } from "../../../api/getCalenderMission";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";


const CalenderComponent = () => {

  const [missionRecord, setMissionRecord] = useState([]);


  useEffect(() => {
    const fetchData = async() => {
      const result  = await getCalenderMission();
      console.log(result);
      setMissionRecord(result);
    }
    fetchData();
  },[])

  const getTileClass = ({ date, view }) => {
    if (view !== "month") return;

    const formattedDate = format(date, "yyyy-MM-dd");

    const record = missionRecord.find(
      (item) => item.to_char === formattedDate,
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
