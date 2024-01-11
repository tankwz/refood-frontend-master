/** @format */

const { default: axios } = require("axios");
const instance = axios.create({
  baseURL: "https://refood-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Add a request interceptor
instance.interceptors.request.use((req) => {
  const token = window.localStorage.getItem("accessToken");
  const user = window.localStorage.getItem("user");
  const CustomerId = JSON.parse(user)?.CustomerId;
  if (token && CustomerId) {
    req.headers.Authorization = token;
    req.headers.CustomerId = CustomerId;
  }
  return req;
});

// Add a response interceptor
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default instance;
