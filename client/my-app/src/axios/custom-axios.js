import axios from "axios";

export const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpRequest.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${getAccessToken()}`,
    };
    return config;
  },
  (err) => {
    return err;
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

function getAccessToken() {
  const localStorageData = JSON.parse(localStorage.getItem("persist:user"));
  if (localStorageData) {
    const access_token = JSON.parse(localStorageData.token);
    return access_token;
  }
  return null;
}
