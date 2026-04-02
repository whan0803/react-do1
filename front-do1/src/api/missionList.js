import api from "./user";

export const missionList = async () => {
  const user_id = sessionStorage.getItem("user_id");
  const res = await api.post("/list", { user_id });
  return res.data;
};
