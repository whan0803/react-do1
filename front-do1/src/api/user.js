// api/user.js
import axios from "axios";

const api = axios.create({
  baseURL:
    "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api",
  timeout: 10000,
});

// 앱 시작 시 서버 워밍업 (콜드 스타트 방지)
api.get("/health").catch(() => {});

export const signup = (data) => api.post("/signup", data);
export const login = (data) => api.post("/login", data);
export const getProfile = (data) => api.post("/me", data);
export const updateProfile = (data) => api.post("/update", data);

export default api


