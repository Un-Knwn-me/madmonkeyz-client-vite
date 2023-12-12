import axios from 'axios';
import { Backend_URL } from '../../App';

const userAPI = {
  loginUser: async (userData) => {
    try {
      const response = await axios.post(`${Backend_URL}/users/signin`, userData);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  signupUser: async (userData) => {
    try {
      const response = await axios.post(`${Backend_UR}/signup`, userData);
      return response;
    } catch (error) {
      return error.response;
    }
  },
};

export default userAPI;