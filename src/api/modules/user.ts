import api from '../api.js'

export default {
  async register(payload) {
    try {
      const response = await api.post('/auth/register', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error;
    }
  },

  async login(payload) {
    try {
      const response = await api.post('/auth/login', payload);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error;
    }
  },
}