import axios from 'axios';
import { toast } from '@/store/toast.store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to extract cookie by name
const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

api.interceptors.request.use(
  (config) => {
    const token = getCookie('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    
    // Handle Network Errors (e.g., server down, internet connection issue)
    if (!error.response) {
      toast.error(
        'Network Connection Error',
        'Please check your internet connection or try again later.'
      );
    } 
    // Handle Internal Server Errors (5xx)
    else if (status >= 500) {
      toast.error(
        'Server Error',
        'Something went wrong on our end. Please try again later.'
      );
    }
    // Handle Unauthorized Errors (401)
    else if (
      status === 401 && 
      typeof window !== 'undefined' && 
      !error.config.url?.includes('/auth/login')
    ) {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/auth/login';
    }

    return Promise.reject(error);
  }
);

export default api;
