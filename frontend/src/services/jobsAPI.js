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