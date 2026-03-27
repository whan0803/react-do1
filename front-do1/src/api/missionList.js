import axios from "axios";

export const missionList = async() => {
      const user_id = sessionStorage.getItem("user_id");
    const res = await axios.post("http://localhost:3000/getMission/list", {user_id});
    return res.data;
}