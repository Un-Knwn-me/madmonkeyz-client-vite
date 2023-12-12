import { Backend_URL, token } from "../../App";
import axios from "axios"

const cartAPI = {
  addItem: async (productId, quantity, salesPrice, price) => {
    try {
      const response = await axios.post(`${Backend_URL}/cart/addToCart`, {productId, quantity, salesPrice, price}, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  getItem: async () => {
    try {
      const response = await axios.get(`${Backend_URL}/cart/getProducts`, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  updateItem: async (productId, quantity) => {
    try {
      const response = await axios.put(`${Backend_URL}/cart/changeQuantity`, {productId, quantity}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  removeItem: async (productId) => {
    try {
      const response = await axios.delete(`${Backend_URL}/cart/removecart/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  addAddress: async (formData) => {
    try {
      const response = await axios.delete(`${Backend_URL}/cart/addAddress`, {formData}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};

export default cartAPI;