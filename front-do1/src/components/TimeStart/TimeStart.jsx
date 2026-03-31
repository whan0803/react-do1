import { useEffect, useRef } from "react";
import { useGetMissionStore } from "../../store/useMissionStore";
import { missionResultStore } from "../../store/missionResultStore";

const TimeStart = ({ children }) => {
  const { setRemainingTime, setDay, resetTimer } = useGetMissionStore();
  const { missionResult, setMissionResult } = missionResultStore();

  useEffect(() => {
    if (missionResult !== "success" && missionResult !== "fail") return;

    console.log("타이머 시작됨");

    const timer = setInterval(() => {
      const remaining = useGetMissionStore.getState().remainingTime;

      if (remaining <= 0) {
        clearInterval(timer);
        setDay((day) => day + 1);
        resetTimer();
        setMissionResult(null); // 타이머 밖에서 단독으로 호출
        return;
      }

      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [missionResult]);

  return children;
};

export default TimeStart;
