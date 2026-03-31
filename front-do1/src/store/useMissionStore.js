import { create } from "zustand";

const getUserId = () => sessionStorage.getItem("user_id");

const getSecondsUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight - now) / 1000);
};

export const useGetMissionStore = create((set) => ({
  mission: "",
  setMission: (mission) => set({ mission }),

  missionId: null,
  setMissionId: (id) => set({ missionId: id }),

  startTime: null,
  setStartTime: (time) => set({ startTime: time }),

  remainingTime: getSecondsUntilMidnight(),
  setRemainingTime: (value) =>
    set((state) => {
      const next =
        typeof value === "function" ? value(state.remainingTime) : value;
      const userId = getUserId();
      if (userId) localStorage.setItem(`remainingTime_${userId}`, next);
      return { remainingTime: next };
    }),

  day: 1,
  setDay: (value) =>
    set((state) => {
      const next = typeof value === "function" ? value(state.day) : value;
      const userId = getUserId();
      if (userId) localStorage.setItem(`day_${userId}`, next);
      return { day: next };
    }),

  status: "idle",
  setStatus: (status) => set({ status }),

  hashSubmitted: false,
  setHashSubmitted: (value) => set({ hashSubmitted: value }),

  loadUserState: () => {
    const userId = getUserId();
    if (userId) {
      const savedTime = localStorage.getItem(`remainingTime_${userId}`);
      const savedDay = localStorage.getItem(`day_${userId}`);
      set({
        remainingTime: savedTime
          ? Number(savedTime)
          : getSecondsUntilMidnight(),
        day: savedDay ? Number(savedDay) : 1,
      });
    }
  },

  resetTimer: () => {
    const userId = getUserId();
    const time = getSecondsUntilMidnight();
    if (userId) localStorage.setItem(`remainingTime_${userId}`, time);
    set({
      remainingTime: time,
      startTime: null,
      status: "idle",
    });
  },
}));
