import { Backend_URL } from "../../App";
import axios from "axios";

const getAuthToken = () => {
  return localStorage.getItem('token') || '';
};

const productAPI = {
  homeProducts: async (userId) => {
    try {
      const response = await axios.get(`${Backend_URL}/product/home?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  listProducts: async (sortBy) => {
    try {
      const response = await axios.get(`${Backend_URL}/product/list?sortBy=${sortBy}`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  getProductInfo: async (productId) => {
    try {
      const response = await axios.get(`${Backend_URL}/product/${productId}`, {
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};

export default productAPI;