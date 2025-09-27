// services/api.js
import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // change if your backend runs on another port
});

// 🔹 Attach JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
