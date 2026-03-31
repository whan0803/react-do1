import { create } from "zustand";
import { useGetMissionStore } from "./useMissionStore";
import { missionResultStore } from "./missionResultStore";

export const setUserStore = create((set) => ({
  user: null,

  setUser: (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("user_id", user.user_id);
    set({ user });

    // 유저 바뀔 때 해당 유저 데이터 로드
    const { loadUserState } = useGetMissionStore.getState();
    const { loadMissionResult } = missionResultStore.getState();
    loadUserState();
    loadMissionResult();
  },

  loadUser: () => {
    const storeUser = sessionStorage.getItem("user");
    if (storeUser) {
      set({ user: JSON.parse(storeUser) });
    }
  },

  logoutUser: () => {
    const userId = sessionStorage.getItem("user_id");
    set({ user: null });
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("user_id");
    // 로그아웃 시 해당 유저 localStorage 데이터 삭제
    if (userId) {
      localStorage.removeItem(`missionResult_${userId}`);
      localStorage.removeItem(`remainingTime_${userId}`);
      localStorage.removeItem(`day_${userId}`);
    }
  },
}));
