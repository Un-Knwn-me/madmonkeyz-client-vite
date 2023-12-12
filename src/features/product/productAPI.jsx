import { Backend_URL, token } from "../../App";
import axios from "axios"

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
  productInfo: async (productId) => {
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