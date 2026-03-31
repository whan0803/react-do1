import axios from "axios";

export const getMission = async () => {
  const user_id = sessionStorage.getItem("user_id");
  const res = await axios.post("http://localhost:3000/getMission/mission", {
    user_id,
  }); // ← 객체로 변경
  return res.data;
};

export const getTodayMissionResult = async () => {
  const user_id = sessionStorage.getItem("user_id");
  const res = await axios.post("http://localhost:3000/getMission/today-result", {
    user_id,
  });
  return res.data;
};

export const successMission = async(data) => {
    const res = await axios.post("http://localhost:3000/getMission/success", data);
    return res.data;
}

export const failMission = async(data) => {
    const res = await axios.post("http://localhost:3000/getMission/fail", data);
    return res.data;
}