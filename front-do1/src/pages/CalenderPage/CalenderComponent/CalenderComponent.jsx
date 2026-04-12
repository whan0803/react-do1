import style from "./CalenderComponent.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getCalenderMission } from "../../../api/getCalenderMission";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

const CalenderComponent = () => {
  const { data: missionRecord = [] } = useQuery({
    queryKey: ["calendar-mission-record"],
    queryFn: getCalenderMission,
    staleTime: 1000 * 60 * 5,
  });

  const missionRecordMap = useMemo(
    () =>
      new Map(
        missionRecord.map((item) => [
          item.record_date ?? item.to_char,
          item.is_success,
        ]),
      ),
    [missionRecord],
  );

  const successCount = useMemo(
    () => missionRecord.filter((item) => item.is_success).length,
    [missionRecord],
  );

  const maxStreak = useMemo(() => {
    const sorted = [...missionRecord].sort(
      (a, b) => new Date(a.record_date) - new Date(b.record_date),
    );

    let streak = 0;
    let nextMaxStreak = 0;

    for (let i = 0; i < sorted.length; i += 1) {
      if (sorted[i].is_success) {
        streak += 1;
        nextMaxStreak = Math.max(nextMaxStreak, streak);
      } else {
        streak = 0;
      }
    }

    return nextMaxStreak;
  }, [missionRecord]);

  const getTileClass = ({ date, view }) => {
    if (view !== "month") return;

    const formattedDate = format(date, "yyyy-MM-dd");
    const isSuccess = missionRecordMap.get(formattedDate);
    if (typeof isSuccess !== "boolean") return;
    return isSuccess ? style.success : style.fail;
  };

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
