import api from "./user";
import { getSessionUserId } from "../utils/sessionUser";

export const getMission = async () => {
  const user_id = getSessionUserId();
  const res = await api.post("/mission", { user_id });
  return res.data;
};

export const getTodayMissionResult = async () => {
  const user_id = getSessionUserId();
  const res = await api.post("/today-result", { user_id });
  return res.data;
};

export const getMissionDayCount = async () => {
  const user_id = getSessionUserId();
  const res = await api.post("/day-count", { user_id });
  return res.data;
};

export const successMission = async (data) => {
  const res = await api.post("/success", data);
  return res.data;
};

export const failMission = async (data) => {
  const res = await api.post("/fail", data);
  return res.data;
};
