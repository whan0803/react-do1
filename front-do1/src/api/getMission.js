import axios from "axios";
import { getSessionUserId } from "../utils/sessionUser";

export const getMission = async () => {
  const user_id = getSessionUserId();
  const res = await axios.post("http://localhost:3003/getMission/mission", {
    user_id,
  }); // ← 객체로 변경
  return res.data;
};

export const getTodayMissionResult = async () => {
  const user_id = getSessionUserId();
  const res = await axios.post("http://localhost:3003/getMission/today-result", {
    user_id,
  });
  return res.data;
};

export const getMissionDayCount = async () => {
  const user_id = getSessionUserId();
  const res = await axios.post("http://localhost:3003/getMission/day-count", {
    user_id,
  });
  return res.data;
};

export const successMission = async(data) => {
    const res = await axios.post("http://localhost:3003/getMission/success", data);
    return res.data;
}

export const failMission = async(data) => {
    const res = await axios.post("http://localhost:3003/getMission/fail", data);
    return res.data;
}