import axios from 'axios';
import { Backend_URL } from '../../App';

const getAuthToken = () => {
  return localStorage.getItem('token') || '';
};

const userAPI = {
  loginUser: async (userData) => {
    try {
      const response = await axios.post(`${Backend_URL}/users/signin`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },

  signupUser: async (userData) => {
    try {
      const response = await axios.post(`${Backend_URL}/users/signup`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};

export default userAPI;