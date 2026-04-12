// api/user.js
import axios from "axios";

const api = axios.create({
  baseURL:
    "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api",
  timeout: 10000,
});

const warmServerOnce = () => {
  if (typeof window === "undefined") return;
  if (window.sessionStorage.getItem("api_warmed") === "true") return;

  const runWarmup = () => {
    api
      .get("/health")
      .then(() => {
        window.sessionStorage.setItem("api_warmed", "true");
      })
      .catch(() => {});
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(runWarmup, { timeout: 2000 });
    return;
  }

  window.setTimeout(runWarmup, 1500);
};

warmServerOnce();

export const signup = (data) => api.post("/signup", data);
export const login = (data) => api.post("/login", data);
export const getProfile = (data) => api.post("/me", data);
export const updateProfile = (data) => api.post("/update", data);

export default api;
