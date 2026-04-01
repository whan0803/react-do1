import axios from "axios";

export const signup = (data) => {
    return axios.post(
      "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api/signup",
      data,
    );
}

export const login = (data) => {
    return axios.post(
      "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api/login",
      data,
    );
}

export const getProfile = (data) => {
    return axios.post(
      "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api/me",
      data,
    );
}

export const updateProfile = (data) => {
    return axios.post(
      "https://do1-backend-gbag47575-3813-gyeungwhans-projects.vercel.app/api/update",
      data,
    );
}