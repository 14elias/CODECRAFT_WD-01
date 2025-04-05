import axios from 'axios';
import {API_BASE_URL} from '../constants.js';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/api/token/', {
      username: username,
      password: password,
    });
    return response.data; 
  } catch (error) {
    console.error('Login failed:', error);
    throw error; 
  }
};