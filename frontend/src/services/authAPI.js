// services/authApi.js
import API from "./api";

// 🔹 Auth endpoints
export const login = (role, data) => API.post(`/${role}/login`, data);
export const register = (role, data) => API.post(`/${role}/register`, data);

// 🔹 Profile for logged-in user
export const getProfile = () => API.get("/profile");
export const updateProfile = (data) => API.put("/profile", data);
export const deleteProfile = () => API.delete("/profile");

// 🔹 Admin/Faculty management of others (extra)
export const getAllStudents = () => API.get("/students");
export const getStudentById = (id) => API.get(`/students/${id}`);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

export const getAllManagement = () => API.get("/management");
export const getManagementById = (id) => API.get(`/management/${id}`);
export const deleteManagement = (id) => API.delete(`/management/${id}`);
