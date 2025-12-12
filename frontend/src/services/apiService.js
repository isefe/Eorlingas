import axios from 'axios';

// Base Configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if your backend runs on a different port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Auto-attach JWT Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Methods
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

export const spaceService = {
  getAllSpaces: (filters) => api.get('/spaces', { params: filters }),
  getSpaceById: (id) => api.get(`/spaces/${id}`),
  updateStatus: (id, statusData) => api.put(`/spaces/${id}/status`, statusData),
};

export const bookingService = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getUpcoming: () => api.get('/bookings/upcoming'),
  getPast: () => api.get('/bookings/past'),
  cancelBooking: (id) => api.delete(`/bookings/${id}`),
};

export default api;