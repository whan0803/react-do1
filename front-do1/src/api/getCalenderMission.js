import api from "./user";

export const getCalenderMission = async () => {
  const res = await api.post("/calender");
  return res.data;
};
