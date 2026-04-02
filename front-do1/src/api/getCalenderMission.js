import api from "./user";

export const getCalenderMission = async () => {
  const user_id = sessionStorage.getItem("user_id");
  const res = await api.post("/calender", { user_id });
  return res.data;
};
