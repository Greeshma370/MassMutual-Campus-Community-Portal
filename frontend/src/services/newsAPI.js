// services/newsApi.js
import API from "./api";

// 🔹 News CRUD
export const getNews = () => API.get("/news");
export const getNewsById = (id) => API.get(`/news/${id}`);
export const createNews = (data) => API.post("/news", data);
export const updateNews = (id, data) => API.put(`/news/${id}`, data);
export const deleteNews = (id) => API.delete(`/news/${id}`);
