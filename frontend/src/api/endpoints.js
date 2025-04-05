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

export const register = async (first_name, last_name, username, email, password) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/register/`,
        {
          username,
          first_name,
          last_name,
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false, 
        }
      );
      return response.data;
    } catch (error) {
      console.error('Register failed:', error);
      throw error;
    }
  };

  export const logout = async () => {
    const response = await api.post('/api/logout/')
    return response.data
  }

  export const isAuthenticated = async () => {
    const response = await api.get('/api/');
    return response.data;
  }