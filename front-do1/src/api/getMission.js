import axios from "axios";

export const getMission = async() => {
    const res = await axios.get("http://localhost:3000/getMission/mission");
    return res.data;
}