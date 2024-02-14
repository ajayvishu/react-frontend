import axios from 'axios';

const BASE_URL = 'http://msp.dotnetapi.com';

const ApiService = {
  get: async (url, headers = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/${url}`, { headers });
      return response;
    } catch (error) {
      console.log('get rror', error);
    }
  },

  post: async (url, data, headers = {}) => {
    try {
      const response = await axios.post(`${BASE_URL}/${url}`, data, { headers });
      return response;
    } catch (error) {
      console.log('post rror', error);
    }
  },

  put: async (url, data, headers = {}) => {
    try {
      const response = await axios.put(`${BASE_URL}/${url}`, data, { headers });
      return response;
    } catch (error) {
      console.log('put rror', error);
    }
  },

  delete: async (url, headers = {}) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${url}`, { headers });
      return response;
    } catch (error) {
      console.log('delete rror', error);
    }
  },
};

export default ApiService;