import api from "./user";

export const getMission = async () => {
  const res = await api.post("/mission");
  return res.data;
};

export const getTodayMissionResult = async () => {
  const res = await api.post("/today-result");
  return res.data;
};

export const getMissionDayCount = async () => {
  const res = await api.post("/day-count");
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
