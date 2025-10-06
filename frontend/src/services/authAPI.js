// services/authApi.js
import API from "./api";

export const login = (role, data) => API.post(`/login/${role}`, data);

export const register = (role, data) => {
  const url = `/${role}s/register`;
  return API.post(url, data);
};

// Helper: decode token payload from localStorage
const decodeToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload; // { id, role, iat, exp }
  } catch (e) {
    return null;
  }
};

// 🔹 Profile for logged-in user (role-aware)
export const getProfile = () => {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject(new Error('No authentication token'));
  const payload = decodeToken(token);
  if (!payload || !payload.id || !payload.role) return Promise.reject(new Error('Invalid token'));

  const { id, role } = payload;
  if (role === 'faculty') return API.get(`/faculty/${id}`);
  if (role === 'student') return API.get(`/students/${id}`);
  if (role === 'management') return API.get(`/management/${id}`);

  return Promise.reject(new Error('Unsupported role'));
};

// Note: update/delete profile endpoints are role-specific (e.g. PUT /students/:id),
// keep the generic helpers but consumers should call role-specific APIs when updating/deleting.
export const updateProfile = (id, data) => {
  // caller should provide id and the correct endpoint; try to infer from token if id omitted
  const token = localStorage.getItem('token');
  const payload = token ? decodeToken(token) : null;
  const role = payload?.role;
  const targetId = id || payload?.id;
  if (!role || !targetId) return Promise.reject(new Error('Missing role or id for update'));

  if (role === 'faculty') return API.put(`/faculty/${targetId}`, data);
  if (role === 'student') return API.put(`/students/${targetId}`, data);
  if (role === 'management') return API.put(`/management/${targetId}`, data);
  return Promise.reject(new Error('Unsupported role'));
};

export const deleteProfile = (id) => {
  const token = localStorage.getItem('token');
  const payload = token ? decodeToken(token) : null;
  const role = payload?.role;
  const targetId = id || payload?.id;
  if (!role || !targetId) return Promise.reject(new Error('Missing role or id for delete'));

  if (role === 'faculty') return API.delete(`/faculty/${targetId}`);
  if (role === 'student') return API.delete(`/students/${targetId}`);
  if (role === 'management') return API.delete(`/management/${targetId}`);
  return Promise.reject(new Error('Unsupported role'));
};

// 🔹 Admin/Faculty management of others (extra)
export const getAllStudents = () => API.get("/students");
export const getStudentById = (id) => API.get(`/students/${id}`);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

// 🔹 Faculty management
export const getAllFaculty = () => API.get("/faculty");
export const getFacultyById = (id) => API.get(`/faculty/${id}`);
export const deleteFaculty = (id) => API.delete(`/faculty/${id}`);

export const getAllManagement = () => API.get("/management");
export const getManagementById = (id) => API.get(`/management/${id}`);
export const deleteManagement = (id) => API.delete(`/management/${id}`);
