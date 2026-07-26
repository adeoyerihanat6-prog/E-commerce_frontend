import axios from 'axios';

const API = axios.create({
  baseURL: 'https://e-commerce-fxon.onrender.com/api', // Added /api here
});

// Attach JWT token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;