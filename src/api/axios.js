import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://e-commerce-fxon.onrender.com/api',
  timeout: 60000, // 👈 Increased to 60 seconds to allow Render's free tier time to wake up
}); // Optional: fails gracefully if server takes longer than 10s to respond


// Attach JWT token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;