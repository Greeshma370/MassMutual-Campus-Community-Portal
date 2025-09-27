import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jobs'; // Your backend URL

export const getJobs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};