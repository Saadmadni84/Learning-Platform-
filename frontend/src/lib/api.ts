import axios from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies for authentication
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or cookies
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/auth/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const api = {
  // Auth endpoints
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiClient.post('/auth/login', credentials),
    register: (userData: { name: string; email: string; password: string; role: string }) =>
      apiClient.post('/auth/register', userData),
    logout: () => apiClient.post('/auth/logout'),
    refresh: (refreshToken: string) =>
      apiClient.post('/auth/refresh', { refreshToken }),
    forgotPassword: (email: string) =>
      apiClient.post('/auth/forgot-password', { email }),
    resetPassword: (token: string, password: string) =>
      apiClient.post('/auth/reset-password', { token, password }),
  },

  // User endpoints
  user: {
    getProfile: () => apiClient.get('/user/profile'),
    updateProfile: (data: any) => apiClient.put('/user/profile', data),
    getDashboard: () => apiClient.get('/user/dashboard'),
  },

  // Course endpoints
  course: {
    getAll: () => apiClient.get('/courses'),
    getById: (id: string) => apiClient.get(`/courses/${id}`),
    create: (data: any) => apiClient.post('/courses', data),
    update: (id: string, data: any) => apiClient.put(`/courses/${id}`, data),
    delete: (id: string) => apiClient.delete(`/courses/${id}`),
    enroll: (id: string) => apiClient.post(`/courses/${id}/enroll`),
  },

  // Challenge endpoints
  challenge: {
    getAll: () => apiClient.get('/challenges'),
    getById: (id: string) => apiClient.get(`/challenges/${id}`),
    submit: (id: string, data: any) => apiClient.post(`/challenges/${id}/submit`, data),
    getLeaderboard: (id: string) => apiClient.get(`/challenges/${id}/leaderboard`),
  },

  // Quest endpoints
  quest: {
    getAll: () => apiClient.get('/quests'),
    getById: (id: string) => apiClient.get(`/quests/${id}`),
    start: (id: string) => apiClient.post(`/quests/${id}/start`),
    complete: (id: string, data: any) => apiClient.post(`/quests/${id}/complete`, data),
  },

  // Source endpoints
  source: {
    getAll: () => apiClient.get('/sources'),
    getById: (id: string) => apiClient.get(`/sources/${id}`),
    create: (data: any) => apiClient.post('/sources', data),
    update: (id: string, data: any) => apiClient.put(`/sources/${id}`, data),
    delete: (id: string) => apiClient.delete(`/sources/${id}`),
    upload: (data: FormData) => apiClient.post('/sources/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  },

  // Payment endpoints
  payment: {
    createIntent: (data: any) => apiClient.post('/payment/create-intent', data),
    confirmPayment: (data: any) => apiClient.post('/payment/confirm', data),
    getHistory: () => apiClient.get('/payment/history'),
  },

  // Notification endpoints
  notification: {
    getAll: () => apiClient.get('/notifications'),
    markAsRead: (id: string) => apiClient.put(`/notifications/${id}/read`),
    markAllAsRead: () => apiClient.put('/notifications/read-all'),
  },

  // Upload endpoints
  upload: {
    image: (data: FormData) => apiClient.post('/upload/image', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    video: (data: FormData) => apiClient.post('/upload/video', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    document: (data: FormData) => apiClient.post('/upload/document', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  },
};

export { apiClient };
export default apiClient;