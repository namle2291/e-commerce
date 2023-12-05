import axios from "axios";

export const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpRequest.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("persist:user")).token;
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token.slice(1, -1)}`,
      };
    }
    console.log(token);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error.response.data);
  }
);
