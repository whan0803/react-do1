import { useEffect } from "react";
import { useGetMissionStore } from "../../store/useMissionStore";
import { missionResultStore } from "../../store/missionResultStore";
import { getRemainingSeconds, getNextResetAt, isResetPassed } from "../../utils/missionReset";

const TimeStart = ({ children }) => {
  const { setRemainingTime, setDay, resetTimer, setNextResetAt } = useGetMissionStore();
  const { missionResult, setMissionResult } = missionResultStore();

  useEffect(() => {
    if (missionResult !== "success" && missionResult !== "fail") return;

    const timer = setInterval(() => {
      const { nextResetAt } = useGetMissionStore.getState();
      const safeResetAt = isResetPassed(nextResetAt) ? getNextResetAt() : nextResetAt;

      if (safeResetAt !== nextResetAt) {
        setNextResetAt(safeResetAt);
      }

      const remaining = getRemainingSeconds(safeResetAt);

      if (remaining <= 0) {
        clearInterval(timer);
        setDay((day) => day + 1);
        resetTimer();
        setMissionResult(null);
        const userId = sessionStorage.getItem("user_id");
        if (userId) sessionStorage.removeItem(`mission_${userId}`);
        return;
      }

      setRemainingTime(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [missionResult]);

  return children;
};

export default TimeStart;
