import axios from "axios";

export const getMission = async() => {
    const res = await axios.get("http://localhost:3000/getMission/mission");
    return res.data;
}

export const successMission = async(data) => {
    const res = await axios.post("http://localhost:3000/getMission/success", data);
    return res.data;
}

export const failMission = async(data) => {
    const res = await axios.post("http://localhost:3000/getMission/fail", data);
    return res.data;
}