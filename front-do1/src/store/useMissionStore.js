import { create } from "zustand";
import {
  getNextResetAt,
  getRemainingSeconds,
  getMissionCycleKey,
  isResetPassed,
  isLegacyNoonResetAt,
} from "../utils/missionReset";
import { getSessionUserId } from "../utils/sessionUser";
import { getMissionDayCount } from "../api/getMission";

const getStoredDay = (userId) => {
  const savedDayRaw = localStorage.getItem(`day_${userId}`);
  const savedDay = Number(savedDayRaw);
  return Number.isFinite(savedDay) && savedDay > 0 ? savedDay : null;
};

const getDayDiff = (fromKey, toKey) => {
  if (!fromKey || !toKey) return 0;

  const fromDate = new Date(`${fromKey}T00:00:00`);
  const toDate = new Date(`${toKey}T00:00:00`);
  const diffMs = toDate.getTime() - fromDate.getTime();

  if (!Number.isFinite(diffMs) || diffMs <= 0) return 0;

  return Math.floor(diffMs / (24 * 60 * 60 * 1000));
};

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
      if (userId) {
        localStorage.setItem(`day_${userId}`, String(next));
        localStorage.setItem(`dayCycleKey_${userId}`, getMissionCycleKey());
      }
      return { day: next };
    }),

  status: "idle",
  setStatus: (status) => set({ status }),

  hashSubmitted: false,
  setHashSubmitted: (value) => set({ hashSubmitted: value }),

  loadUserState: async () => {
    const userId = getSessionUserId();
    if (!userId) return;
    const currentCycleKey = getMissionCycleKey();

    let dbDays = 0;
    try {
      const data = await getMissionDayCount();
      dbDays = Number(data?.mission_days) || 0;
    } catch (err) {
      // DB 실패 시에만 로컬 폴백
      dbDays = getStoredDay(userId) ?? 1;
      console.log(err);
    }

    const savedDay = getStoredDay(userId);
    const savedCycleKey = localStorage.getItem(`dayCycleKey_${userId}`);
    const progressedDay =
      savedDay == null ? 0 : savedDay + getDayDiff(savedCycleKey, currentCycleKey);

    // DB 완료 일수와 현재 미션 사이클 경과분을 함께 반영
    const day = Math.max(dbDays, progressedDay, 1);
    localStorage.setItem(`day_${userId}`, String(day));
    localStorage.setItem(`dayCycleKey_${userId}`, currentCycleKey);

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
