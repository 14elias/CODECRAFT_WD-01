// src/api.js
import axios from 'axios';
import API_BASE_URL from '../constants.js'
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = () => api.get('/users');

