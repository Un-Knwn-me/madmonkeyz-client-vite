import { Backend_URL, getAuthToken } from "../../App";
import axios from "axios"

const token = getAuthToken();

const productAPI = {
  listProducts: async (sortBy) => {
    try {
      const response = await axios.get(`${Backend_URL}/product/list?sortBy=${sortBy}`, {
        headers: {
            Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
          },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};

export default productAPI;