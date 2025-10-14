import axios from "axios";

// Create an axios instance for your backend
const api = axios.create({
  baseURL: "http://localhost:4000", // Backend URL
  withCredentials: true, // allow sending cookies if needed
});

// Optional: attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
