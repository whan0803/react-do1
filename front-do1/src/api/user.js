// api/user.js

// "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api";
import axios from "axios";
import { clearAccessToken, getAccessToken } from "../utils/sessionUser";

const api = axios.create({
  baseURL:
    "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAccessToken();
    }

    return Promise.reject(error);
  },
);

const warmServerOnce = () => {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem("api_warmed") === "true") return;

  const runWarmup = () => {
    api
      .get("/health")
      .then(() => {
        window.localStorage.setItem("api_warmed", "true");
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
export const getProfile = () => api.post("/me");
export const updateProfile = (data) => api.post("/update", data);

export default api;
