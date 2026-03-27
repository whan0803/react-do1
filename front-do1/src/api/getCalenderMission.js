import axios from "axios";

export const getCalenderMission = async() => {
    const user_id = sessionStorage.getItem("user_id");
    const res = await axios.post("http://localhost:3000/getMission/calender", {user_id});
    return res.data;

}