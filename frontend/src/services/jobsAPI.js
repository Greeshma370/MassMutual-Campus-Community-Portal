// services/jobsApi.js
import API from "./api";

// 🔹 Jobs CRUD
export const getJobs = () => API.get("/jobs");
export const getJobById = (id) => API.get(`/jobs/${id}`);
export const createJob = (data) => API.post("/jobs", data);
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
