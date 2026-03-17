import axios from "axios";

export const signup = (data) => {
    return axios.post("http://localhost:3000/user", data);
}

export const login = (data) => {
    return axios.post("http://localhost:3000/user/login", data);
}