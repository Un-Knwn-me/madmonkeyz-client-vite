import { Backend_URL } from "../../App";
import axios from "axios"


const productAPI = {
  listProducts: async (sortBy) => {
    try {
      const response = await axios.get(`${Backend_URL}/product/list?sortBy=${sortBy}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};

export default productAPI;