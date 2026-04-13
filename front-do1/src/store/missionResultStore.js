import { create } from "zustand";
import { formatLocalDate } from "../utils/missionReset";
import { getTodayMissionResult } from "../api/getMission";
import { hasAccessToken } from "../utils/sessionUser";

const getTodayDate = () => formatLocalDate(new Date());

export const missionResultStore = create((set) => ({
  missionResult: null,

  setMissionResult: (result) => {
    if (hasAccessToken()) {
      if (result) {
        localStorage.setItem("missionResult", result);
        localStorage.setItem("missionResultDate", getTodayDate());
      } else {
        localStorage.removeItem("missionResult");
        localStorage.removeItem("missionResultDate");
      }
    }
    set({ missionResult: result });
  },

  loadMissionResult: async () => {
    if (!hasAccessToken()) {
      set({ missionResult: null });
      return;
    }

    const savedDate = localStorage.getItem("missionResultDate");
    if (savedDate && savedDate !== getTodayDate()) {
      localStorage.removeItem("missionResult");
      localStorage.removeItem("missionResultDate");
      set({ missionResult: null });
      return;
    }

    try {
      const data = await getTodayMissionResult();
      const dbResult = data?.missionResult ?? null;

      if (dbResult === "success" || dbResult === "fail") {
        localStorage.setItem("missionResult", dbResult);
        localStorage.setItem("missionResultDate", getTodayDate());
        set({ missionResult: dbResult });
        return;
      }

      localStorage.removeItem("missionResult");
      localStorage.removeItem("missionResultDate");
      set({ missionResult: null });
    } catch {
      const saved = localStorage.getItem("missionResult");
      const fallbackDate = localStorage.getItem("missionResultDate");

      if (saved && fallbackDate === getTodayDate()) {
        set({ missionResult: saved });
        return;
      }

      localStorage.removeItem("missionResult");
      localStorage.removeItem("missionResultDate");
      set({ missionResult: null });
    }
  },
}));
