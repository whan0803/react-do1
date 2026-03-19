import { create } from "zustand";

export const useGetMissionStore = create((set) => ({
  mission: "",
  setMission: (mission) => set({ mission }),

  startTime: null,
  setStartTime: (time) => set({ startTime: time }),

  remainingTime: 10,
  setRemainingTime: (value) =>
    set((state) => ({
        remainingTime: typeof value === "function" ? value(state.remainingTime): value
    })),
  day: 1,
  setDay: (value) => set((state) =>({
      day: typeof value === "function" ? value(state.day): value
  }))
}));