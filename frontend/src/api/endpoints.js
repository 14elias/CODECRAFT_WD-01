import axios from 'axios';
import { API_BASE_URL } from '../constants.js';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensure cookies are sent with requests
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    // Send a request to refresh the access token
    const response = await api.post('/api/token/refresh/', {}, { withCredentials: true });
    console.log('Access token refreshed successfully');
    return response.data.access; // Return the new access token (if needed for debugging)
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (Unauthorized) and the request is not already retried
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        await refreshAccessToken(); // Refresh the access token

        // Retry the original request (cookies will automatically be sent)
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        throw refreshError;
      }
    }

    // If the error is not 401 or the retry fails, reject the promise
    return Promise.reject(error);
  }
);

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
  try {
    const response = await api.post('/api/logout/', {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const isAuthenticated = async () => {
  try {
    const response = await api.get('/api/'); // Use the Axios instance with the interceptor
    return response.data;
  } catch (error) {
    console.error('Error checking authentication:', error);
    throw error;
  }
};