import axios from "axios";

export const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpRequest.interceptors.request.use(
  function (config) {
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
    return Promise.reject(error);
  }
);
