import { create } from "zustand";
import { getNextResetAt, isResetPassed } from "../utils/missionReset";
import { getTodayMissionResult } from "../api/getMission";

const getUserId = () => sessionStorage.getItem("user_id");

export const missionResultStore = create((set) => ({
  missionResult: null,

  setMissionResult: (result) => {
    const userId = getUserId();
    if (userId) {
      if (result) {
        localStorage.setItem(`missionResult_${userId}`, result);
        localStorage.setItem(
          `missionResultResetAt_${userId}`,
          String(getNextResetAt()),
        );
      } else {
        localStorage.removeItem(`missionResult_${userId}`);
        localStorage.removeItem(`missionResultResetAt_${userId}`);
      }
    }
    set({ missionResult: result });
  },

  loadMissionResult: async () => {
    const userId = getUserId();
    if (!userId) return;

    try {
      const data = await getTodayMissionResult();
      const dbResult = data?.missionResult ?? null;

      if (dbResult === "success" || dbResult === "fail") {
        localStorage.setItem(`missionResult_${userId}`, dbResult);
        localStorage.setItem(
          `missionResultResetAt_${userId}`,
          String(getNextResetAt()),
        );
        set({ missionResult: dbResult });
        return;
      }

      localStorage.removeItem(`missionResult_${userId}`);
      localStorage.removeItem(`missionResultResetAt_${userId}`);
      set({ missionResult: null });
    } catch {
      const saved = localStorage.getItem(`missionResult_${userId}`);
      const resetAt = Number(localStorage.getItem(`missionResultResetAt_${userId}`));

      if (saved && !isResetPassed(resetAt)) {
        set({ missionResult: saved });
        return;
      }

      localStorage.removeItem(`missionResult_${userId}`);
      localStorage.removeItem(`missionResultResetAt_${userId}`);
      set({ missionResult: null });
    }
  },
}));
