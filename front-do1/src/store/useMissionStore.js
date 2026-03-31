import { create } from "zustand";
import {
  getNextResetAt,
  getRemainingSeconds,
  isResetPassed,
  isLegacyNoonResetAt,
} from "../utils/missionReset";

const getUserId = () => sessionStorage.getItem("user_id");

export const useGetMissionStore = create((set) => ({
  mission: "",
  setMission: (mission) => set({ mission }),

  missionId: null,
  setMissionId: (id) => set({ missionId: id }),

  startTime: null,
  setStartTime: (time) => set({ startTime: time }),

  nextResetAt: getNextResetAt(),
  setNextResetAt: (value) =>
    set((state) => {
      const next =
        typeof value === "function" ? value(state.nextResetAt) : value;
      const userId = getUserId();
      if (userId) localStorage.setItem(`missionResetAt_${userId}`, String(next));
      return { nextResetAt: Number(next) };
    }),

  remainingTime: getRemainingSeconds(getNextResetAt()),
  setRemainingTime: (value) =>
    set((state) => {
      const next =
        typeof value === "function" ? value(state.remainingTime) : value;
      const userId = getUserId();
      if (userId) localStorage.setItem(`remainingTime_${userId}`, next);
      return { remainingTime: Number(next) };
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
      const savedDay = localStorage.getItem(`day_${userId}`);
      const savedResetAt = Number(localStorage.getItem(`missionResetAt_${userId}`));
      const nextResetAt = isResetPassed(savedResetAt) || isLegacyNoonResetAt(savedResetAt)
        ? getNextResetAt()
        : savedResetAt;
      const remainingTime = getRemainingSeconds(nextResetAt);

      localStorage.setItem(`missionResetAt_${userId}`, String(nextResetAt));
      localStorage.setItem(`remainingTime_${userId}`, String(remainingTime));

      set({
        nextResetAt,
        remainingTime,
        day: savedDay ? Number(savedDay) : 1,
      });
    }
  },

  resetTimer: () => {
    const userId = getUserId();
    const nextResetAt = getNextResetAt();
    const time = getRemainingSeconds(nextResetAt);
    if (userId) {
      localStorage.setItem(`missionResetAt_${userId}`, String(nextResetAt));
      localStorage.setItem(`remainingTime_${userId}`, String(time));
    }
    set({
      nextResetAt,
      remainingTime: time,
      startTime: null,
      status: "idle",
    });
  },
}));
