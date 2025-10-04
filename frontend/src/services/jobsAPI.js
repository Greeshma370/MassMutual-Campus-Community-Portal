import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs'; // Your backend URL

export const getJobs = async () => {
  try {
    // try to read token from localStorage (common keys)
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || null;

    // Create headers object
    const headers = {
      'Content-Type': 'application/json',
    };

    // If a token exists, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.get(API_URL, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const createJob = async (jobData) => {
  try {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await axios.post(API_URL, jobData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await axios.get(`${API_URL}/all`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching all jobs:', error);
    throw error;
  }
};

export const getJobById = async (jobId) => {
  try {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await axios.get(`${API_URL}/${jobId}`, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching job ${jobId}:`, error);
    throw error;
  }
};

export const updateJob = async (jobId, jobData) => {
  try {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await axios.put(`${API_URL}/${jobId}`, jobData, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error updating job ${jobId}:`, error);
    throw error;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken') || null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await axios.delete(`${API_URL}/${jobId}`, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error deleting job ${jobId}:`, error);
    throw error;
  }
};