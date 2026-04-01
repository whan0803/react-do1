import axios from "axios";
import { getSessionUserId } from "../utils/sessionUser";

export const getMission = async () => {
  const user_id = getSessionUserId();
  const res = await axios.post(
    "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api/mission",
    {
      user_id,
    },
  ); // ← 객체로 변경
  return res.data;
};

export const getTodayMissionResult = async () => {
  const user_id = getSessionUserId();
  const res = await axios.post(
    "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api/today-result",
    {
      user_id,
    },
  );
  return res.data;
};

export const getMissionDayCount = async () => {
  const user_id = getSessionUserId();
  const res = await axios.post(
    "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api/day-count",
    {
      user_id,
    },
  );
  return res.data;
};

export const successMission = async(data) => {
    const res = await axios.post(
      "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api/success",
      data,
    );
    return res.data;
}

export const failMission = async(data) => {
    const res = await axios.post(
      "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api/fail",
      data,
    );
    return res.data;
}