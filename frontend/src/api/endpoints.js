import axios from 'axios';
import API_BASE_URL from '../constants.js';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies in requests
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/api/token/', {
      username: username,
      password: password,
    });
    return response.data; // Return the response data (e.g., tokens)
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
};