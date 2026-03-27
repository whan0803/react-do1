import { create } from "zustand";

export const missionResultStore = create((set) => ({
  missionResult: null,

  setMissionResult: (result) => set({ missionResult: result }),
}));