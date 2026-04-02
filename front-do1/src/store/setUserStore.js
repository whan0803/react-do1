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
      const parsed = JSON.parse(storeUser);
      set({ user: parsed });
      if (parsed?.user_id != null) {
        sessionStorage.setItem("user_id", String(parsed.user_id));
      }
    }
  },

  logoutUser: () => {
    // ✅ 로그아웃 시 이전 유저 localStorage 클리어
    const storeUser = sessionStorage.getItem("user");
    if (storeUser) {
      const parsed = JSON.parse(storeUser);
      const userId = parsed?.user_id;
      if (userId) {
        localStorage.removeItem(`missionResult_${userId}`);
        localStorage.removeItem(`missionResultDate_${userId}`);
        localStorage.removeItem(`day_${userId}`);
        localStorage.removeItem(`missionResetAt_${userId}`);
        localStorage.removeItem(`remainingTime_${userId}`);
      }
    }

    set({ user: null });
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("user_id");
  },
}));
