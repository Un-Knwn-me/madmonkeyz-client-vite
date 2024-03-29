import axios from "axios";
import { Backend_URL } from "../../App";

const getAuthToken = () => {
  return localStorage.getItem("token") || "";
};

const userAPI = {
  loginUser: async (userData) => {
    try {
      const response = await axios.post(
        `${Backend_URL}/users/signin`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  signupUser: async (userData) => {
    try {
      const response = await axios.post(
        `${Backend_URL}/users/signup`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  addWishlist: async (productId, varientId, selectedSize) => {
    try {
      const response = await axios.post(
        `${Backend_URL}/users/wishlist/add`,
        { productId, varientId, selectedSize },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  getWishlist: async () => {
    try {
      const response = await axios.get(
        `${Backend_URL}/users/wishlistItems`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  removeWishlistItem: async (itemId) => {
    try {
      const response = await axios.delete(
        `${Backend_URL}/users/wishlist/${itemId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  wishlistItemSize: async (selectedItem, selectedVariantId, selectedSize) => {
    try {
      const response = await axios.post(
        `${Backend_URL}/users/wishlist/addSize`, {selectedItem, selectedVariantId, selectedSize},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
};

export default userAPI;
