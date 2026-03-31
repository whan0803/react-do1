import { create } from "zustand";

const getUserId = () => sessionStorage.getItem("user_id");

export const missionResultStore = create((set) => ({
  missionResult: null,

  setMissionResult: (result) => {
    const userId = getUserId();
    if (userId) {
      localStorage.setItem(`missionResult_${userId}`, result ?? "");
    }
    set({ missionResult: result });
  },

  loadMissionResult: () => {
    const userId = getUserId();
    if (userId) {
      const saved = localStorage.getItem(`missionResult_${userId}`);
      set({ missionResult: saved || null });
    }
  },
}));
