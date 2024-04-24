import ax from "axios";

const axios = ax.create({
  baseURL: "/api",
  timeout: 30000,
});
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axios;
