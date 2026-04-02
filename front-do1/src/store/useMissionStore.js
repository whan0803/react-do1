import { create } from "zustand";
import {
  getNextResetAt,
  getRemainingSeconds,
  isResetPassed,
  isLegacyNoonResetAt,
} from "../utils/missionReset";
import { getSessionUserId } from "../utils/sessionUser";
import { getMissionDayCount } from "../api/getMission";

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
      const userId = getSessionUserId();
      if (userId)
        localStorage.setItem(`missionResetAt_${userId}`, String(next));
      return { nextResetAt: Number(next) };
    }),

  remainingTime: getRemainingSeconds(getNextResetAt()),
  setRemainingTime: (value) =>
    set((state) => {
      const next =
        typeof value === "function" ? value(state.remainingTime) : value;
      const userId = getSessionUserId();
      if (userId) localStorage.setItem(`remainingTime_${userId}`, next);
      return { remainingTime: Number(next) };
    }),

  day: 1,
  setDay: (value) =>
    set((state) => {
      const next = typeof value === "function" ? value(state.day) : value;
      const userId = getSessionUserId();
      if (userId) localStorage.setItem(`day_${userId}`, String(next));
      return { day: next };
    }),

  status: "idle",
  setStatus: (status) => set({ status }),

  hashSubmitted: false,
  setHashSubmitted: (value) => set({ hashSubmitted: value }),

  loadUserState: async () => {
    const userId = getSessionUserId();
    if (!userId) return;

    let dbDays = 0;
    try {
      const data = await getMissionDayCount();
      dbDays = Number(data?.mission_days) || 0;
    } catch (err) {
      // DB 실패 시에만 로컬 폴백
      const savedDayRaw = localStorage.getItem(`day_${userId}`);
      dbDays = savedDayRaw ? Number(savedDayRaw) : 1;
      console.log(err);
    }

    // ✅ DB 값 우선, 최소 1
    const day = Math.max(dbDays, 1);
    localStorage.setItem(`day_${userId}`, String(day));

    const savedResetAt = Number(
      localStorage.getItem(`missionResetAt_${userId}`),
    );
    const nextResetAt =
      isResetPassed(savedResetAt) || isLegacyNoonResetAt(savedResetAt)
        ? getNextResetAt()
        : savedResetAt;
    const remainingTime = getRemainingSeconds(nextResetAt);

    localStorage.setItem(`missionResetAt_${userId}`, String(nextResetAt));
    localStorage.setItem(`remainingTime_${userId}`, String(remainingTime));

    set({ nextResetAt, remainingTime, day });
  },

  resetTimer: () => {
    const userId = getSessionUserId();
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
