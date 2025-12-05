import axios from 'axios';
import store from '@/store';
import router from '@/router';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        store.dispatch('user/logout');
        router.push('/auth');
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
          { refresh_token: refreshToken }
        );

        if (response.data?.data?.access_token && response.data?.data?.refresh_token) {
          localStorage.setItem('access_token', response.data.data.access_token);
          localStorage.setItem('refresh_token', response.data.data.refresh_token);

          originalRequest.headers.Authorization = `Bearer ${response.data.data.access_token}`;

          return api(originalRequest);
        } else {
          throw new Error('Invalid refresh response');
        }
      } catch (refreshError) {
        store.dispatch('user/logout');
        router.push('/auth');
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401 && originalRequest._retry) {
      store.dispatch('user/logout');
      router.push('/auth');
    }

    return Promise.reject(error);
  }
);

export default api;