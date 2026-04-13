import { create } from "zustand";
import { getProfile } from "../api/user";
import { useGetMissionStore } from "./useMissionStore";
import { missionResultStore } from "./missionResultStore";
import {
  clearAccessToken,
  getAccessToken,
} from "../utils/sessionUser";

export const clearMissionStorage = () => {
  localStorage.removeItem("missionResult");
  localStorage.removeItem("missionResultDate");
  localStorage.removeItem("day");
  localStorage.removeItem("dayCycleKey");
  localStorage.removeItem("missionResetAt");
  localStorage.removeItem("remainingTime");
  localStorage.removeItem("mission");
};

export const setUserStore = create((set) => ({
  user: null,

  setUser: (user) => {
    set({ user });

    const { loadUserState } = useGetMissionStore.getState();
    const { loadMissionResult } = missionResultStore.getState();

    loadUserState();
    loadMissionResult();
  },

  loadUser: async () => {
    if (!getAccessToken()) {
      set({ user: null });
      return;
    }

    try {
      const res = await getProfile();
      set({
        user: {
          user_name: res.data.user_name,
          user_email: res.data.user_email,
        },
      });
    } catch (err) {
      clearAccessToken();
      clearMissionStorage();
      set({ user: null });
    }
  },

  logoutUser: () => {
    clearAccessToken();
    clearMissionStorage();
    set({ user: null });
  },
}));
