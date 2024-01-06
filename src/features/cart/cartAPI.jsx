import { Backend_URL, token } from "../../App";
import axios from "axios"

const cartAPI = {
  addItem: async (productId, quantity, salesPrice, price, varientId, selectedSize) => {
    try {
      const response = await axios.post(`${Backend_URL}/cart/addToCart`, {productId, quantity, salesPrice, price, varientId, selectedSize}, {
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
  updateItem: async (cartId, quantity) => {
    try {
      const response = await axios.put(`${Backend_URL}/cart/changeQuantity`, {cartId, quantity}, {
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
  removeItem: async (cartId) => {
    try {
      const response = await axios.delete(`${Backend_URL}/cart/removecart/${cartId}`, {
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
      const response = await axios.post(`${Backend_URL}/cart/addAddress`, {formData}, {
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
  checkAddress: async (deliveryAddress) => {
    try {
      const res = await axios.get(`${Backend_URL}/cart/checkAddress/${deliveryAddress}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          },
      });
      return res;
    } catch (error) {
      return error.res;
    }
  },
  checkPincode: async (pincode) => {
    try {
      const response = await axios.get(`https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=579b464db66ec23bdd00000182063afa81f041e35ddfa64b1906ddaa&format=json&filters%5Bpincode%5D=${pincode}`)
      return response
    } catch (error) {
      return error.response
    }
  }
};

export default cartAPI;