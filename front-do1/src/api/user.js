import axios from "axios";

export const signup = (data) => {
    return axios.post("http://localhost:3003/user", data);
}

export const login = (data) => {
    return axios.post("http://localhost:3003/user/login", data);
}

export const getProfile = (data) => {
    return axios.post("http://localhost:3003/profile/me", data);
}

export const updateProfile = (data) => {
    return axios.post("http://localhost:3003/profile/update", data);
}