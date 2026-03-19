import axios from "axios";

export const getMission = async() => {
    const data = await axios.get("http://localhost:3000/getMission/mission");
}