import api from "./user";

export const missionList = async () => {
  const res = await api.post("/list");
  return res.data;
};
