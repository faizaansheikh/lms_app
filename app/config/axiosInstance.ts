// lib/axiosInstance.ts
import axios from 'axios';
import { getAuthToken } from '../components/authToken';
// import { getCookie } from '../libs';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api` || 'https://api.example.com', // fallback base URL
  //  validateStatus: (status) => status >= 200 && status < 300,
});

// 🔐 Request Interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // debugger
    const token = await getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Optional: handle global errors
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('Unauthorized. Redirect to login.');
        // Optionally redirect or logout user
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
