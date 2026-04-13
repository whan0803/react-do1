import { create } from "zustand";
import {
  getNextResetAt,
  getRemainingSeconds,
  getMissionCycleKey,
  isResetPassed,
  isLegacyNoonResetAt,
} from "../utils/missionReset";
import { hasAccessToken } from "../utils/sessionUser";
import { getMissionDayCount } from "../api/getMission";

const getStoredDay = () => {
  const savedDayRaw = localStorage.getItem("day");
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

      if (hasAccessToken()) {
        localStorage.setItem("missionResetAt", String(next));
      }

      return { nextResetAt: Number(next) };
    }),

  remainingTime: getRemainingSeconds(getNextResetAt()),
  setRemainingTime: (value) =>
    set((state) => {
      const next =
        typeof value === "function" ? value(state.remainingTime) : value;

      if (hasAccessToken()) {
        localStorage.setItem("remainingTime", String(next));
      }

      return { remainingTime: Number(next) };
    }),

  day: 1,
  setDay: (value) =>
    set((state) => {
      const next = typeof value === "function" ? value(state.day) : value;

      if (hasAccessToken()) {
        localStorage.setItem("day", String(next));
        localStorage.setItem("dayCycleKey", getMissionCycleKey());
      }

      return { day: next };
    }),

  status: "idle",
  setStatus: (status) => set({ status }),

  hashSubmitted: false,
  setHashSubmitted: (value) => set({ hashSubmitted: value }),

  loadUserState: async () => {
    if (!hasAccessToken()) {
      const defaultNextResetAt = getNextResetAt();
      set({
        nextResetAt: defaultNextResetAt,
        remainingTime: getRemainingSeconds(defaultNextResetAt),
        day: 1,
      });
      return;
    }

    const currentCycleKey = getMissionCycleKey();

    let dbDays = 0;
    try {
      const data = await getMissionDayCount();
      dbDays = Number(data?.mission_days) || 0;
    } catch (err) {
      dbDays = getStoredDay() ?? 1;
      console.log(err);
    }

    const savedDay = getStoredDay();
    const savedCycleKey = localStorage.getItem("dayCycleKey");
    const progressedDay =
      savedDay == null ? 0 : savedDay + getDayDiff(savedCycleKey, currentCycleKey);

    const day = Math.max(dbDays, progressedDay, 1);
    localStorage.setItem("day", String(day));
    localStorage.setItem("dayCycleKey", currentCycleKey);

    const savedResetAt = Number(localStorage.getItem("missionResetAt"));
    const nextResetAt =
      isResetPassed(savedResetAt) || isLegacyNoonResetAt(savedResetAt)
        ? getNextResetAt()
        : savedResetAt;
    const remainingTime = getRemainingSeconds(nextResetAt);

    localStorage.setItem("missionResetAt", String(nextResetAt));
    localStorage.setItem("remainingTime", String(remainingTime));

    set({ nextResetAt, remainingTime, day });
  },

  resetTimer: () => {
    const nextResetAt = getNextResetAt();
    const time = getRemainingSeconds(nextResetAt);

    if (hasAccessToken()) {
      localStorage.setItem("missionResetAt", String(nextResetAt));
      localStorage.setItem("remainingTime", String(time));
    }

    set({
      nextResetAt,
      remainingTime: time,
      startTime: null,
      status: "idle",
    });
  },
}));
