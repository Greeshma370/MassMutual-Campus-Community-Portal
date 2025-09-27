// services/applicationsApi.js
import API from "./api";

// 🔹 Applications CRUD
export const getApplications = () => API.get("/applications"); // for student/faculty
export const getApplicationById = (id) => API.get(`/applications/${id}`);
export const applyJob = (data) => API.post("/applications", data);
export const updateApplication = (id, data) => API.put(`/applications/${id}`, data);
export const deleteApplication = (id) => API.delete(`/applications/${id}`);
