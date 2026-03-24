import { create } from "zustand";

export const useGetMissionStore = create((set) => ({
  mission: "",
  setMission: (mission) => set({ mission }),

  missionId: null,
  setMissionId: (id) => set({ missionId: id }),

  startTime: null,
  setStartTime: (time) => set({ startTime: time }),

  remainingTime: 180,
  setRemainingTime: (value) =>
    set((state) => ({
      remainingTime:
        typeof value === "function" ? value(state.remainingTime) : value,
    })),

  day: 1,
  setDay: (value) =>
    set((state) => ({
      day: typeof value === "function" ? value(state.day) : value,
    })),

  status: "idle",
  setStatus: (status) => set({ status }),

  resetTimer: () =>
    set({
      remainingTime: 180,
      startTime: null,
      status: "idle",
    }),
}));
