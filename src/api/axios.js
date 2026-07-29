import axios from 'axios';

const API = axios.create({
  // Automatically uses local server during dev, and Render URL when deployed
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-fxon.onrender.com/api',
  timeout: 10000, // Optional: fails gracefully if server takes longer than 10s to respond
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