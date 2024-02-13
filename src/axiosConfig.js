import axios from 'axios';
import { getAuthToken } from './authUtils';

const axiosInstance = axios.create();

// Set up a global request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
