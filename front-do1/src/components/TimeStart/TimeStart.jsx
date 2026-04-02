import { useEffect } from "react";
import { useGetMissionStore } from "../../store/useMissionStore";
import { missionResultStore } from "../../store/missionResultStore";
import {
  getRemainingSeconds,
  getNextResetAt,
  isResetPassed,
} from "../../utils/missionReset";
import { getSessionUserId } from "../../utils/sessionUser";

const TimeStart = ({ children }) => {
  const { setRemainingTime, setDay, resetTimer, setNextResetAt } =
    useGetMissionStore();
  const { missionResult, setMissionResult } = missionResultStore();

  useEffect(() => {
    if (missionResult !== "success" && missionResult !== "fail") return;

    // ✅ interval 시작 전에 즉시 리셋 시각 초과 여부 체크
    const handleReset = () => {
      const { nextResetAt } = useGetMissionStore.getState();
      const safeResetAt = isResetPassed(nextResetAt)
        ? getNextResetAt()
        : nextResetAt;

      if (safeResetAt !== nextResetAt) {
        setNextResetAt(safeResetAt);
      }

      const remaining = getRemainingSeconds(safeResetAt);

      if (remaining <= 0) {
        setDay((day) => day + 1);
        resetTimer();
        setMissionResult(null);
        const userId = getSessionUserId();
        if (userId) sessionStorage.removeItem(`mission_${userId}`);
        return true; // 리셋됨
      }

      setRemainingTime(remaining);
      return false;
    };

    // ✅ 마운트 시점에 즉시 실행 (자정 넘긴 채로 진입한 경우 처리)
    const alreadyReset = handleReset();
    if (alreadyReset) return;

    // ✅ 이후 1초마다 체크
    const timer = setInterval(() => {
      const done = handleReset();
      if (done) clearInterval(timer);
    }, 1000);

    // ✅ visibilitychange: 탭이 백그라운드에서 돌아올 때 즉시 체크
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const done = handleReset();
        if (done) clearInterval(timer);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [missionResult]);

  return children;
};

export default TimeStart;
