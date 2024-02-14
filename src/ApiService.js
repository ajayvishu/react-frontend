import axios from 'axios';

const BASE_URL = process.env.DOTNET_APP_BASEURL;

const token = localStorage.getItem('ModernizeToken');

const ApiService = {
  get: async (url, headers = { Authorization: `Bearer ${token}` }) => {
    try {
      const response = await axios.get(`${BASE_URL}/${url}`, { headers });
      return response;
    } catch (error) {
      console.log('get error', error);
    }
  },

  post: async (url, data, headers = { Authorization: `Bearer ${token}` }) => {
    try {
      const response = await axios.post(`${BASE_URL}/${url}`, data, { headers });
      return response;
    } catch (error) {
      console.log('post error', error);
    }
  },

  put: async (url, data, headers = { Authorization: `Bearer ${token}` }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${url}`, data, { headers });
      return response;
    } catch (error) {
      console.log('put error', error);
    }
  },

  delete: async (url, headers = { Authorization: `Bearer ${token}` }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${url}`, { headers });
      return response;
    } catch (error) {
      console.log('delete error', error);
    }
  },
};

export default ApiService;
