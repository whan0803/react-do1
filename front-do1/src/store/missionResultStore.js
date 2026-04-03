import { create } from "zustand";
import { formatLocalDate } from "../utils/missionReset";
import { getTodayMissionResult } from "../api/getMission";
import { getSessionUserId } from "../utils/sessionUser";

const getTodayDate = () => formatLocalDate(new Date());

export const missionResultStore = create((set) => ({
  missionResult: null,

  setMissionResult: (result) => {
    const userId = getSessionUserId();
    if (userId) {
      if (result) {
        localStorage.setItem(`missionResult_${userId}`, result);
        // ✅ resetAt 대신 오늘 날짜 저장
        localStorage.setItem(`missionResultDate_${userId}`, getTodayDate());
      } else {
        localStorage.removeItem(`missionResult_${userId}`);
        localStorage.removeItem(`missionResultDate_${userId}`);
      }
    }
    set({ missionResult: result });
  },

  loadMissionResult: async () => {
    const userId = getSessionUserId();
    if (!userId) return;

    // ✅ 로컬 날짜가 오늘이 아니면 즉시 클리어, DB 호출도 안 함
    const savedDate = localStorage.getItem(`missionResultDate_${userId}`);
    if (savedDate && savedDate !== getTodayDate()) {
      localStorage.removeItem(`missionResult_${userId}`);
      localStorage.removeItem(`missionResultDate_${userId}`);
      set({ missionResult: null });
      return;
    }

    try {
      const data = await getTodayMissionResult();
      const dbResult = data?.missionResult ?? null;

      if (dbResult === "success" || dbResult === "fail") {
        localStorage.setItem(`missionResult_${userId}`, dbResult);
        localStorage.setItem(`missionResultDate_${userId}`, getTodayDate());
        set({ missionResult: dbResult });
        return;
      }

      localStorage.removeItem(`missionResult_${userId}`);
      localStorage.removeItem(`missionResultDate_${userId}`);
      set({ missionResult: null });
    } catch {
      const saved = localStorage.getItem(`missionResult_${userId}`);
      const savedDate = localStorage.getItem(`missionResultDate_${userId}`);

      // ✅ 오프라인이어도 날짜가 오늘이면 유지
      if (saved && savedDate === getTodayDate()) {
        set({ missionResult: saved });
        return;
      }

      localStorage.removeItem(`missionResult_${userId}`);
      localStorage.removeItem(`missionResultDate_${userId}`);
      set({ missionResult: null });
    }
  },
}));
