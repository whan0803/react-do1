import axios from "axios";

export const getCalenderMission = async() => {
    const user_id = sessionStorage.getItem("user_id");
    const res = await axios.post(
      "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api/calender",
      { user_id },
    );
    return res.data;

}