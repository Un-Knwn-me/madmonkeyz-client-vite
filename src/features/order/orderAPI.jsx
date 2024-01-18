import axios from "axios";
import { Backend_URL } from "../../App";

const getAuthToken = () => {
  return localStorage.getItem('token') || '';
};

const orderAPI = {
    newOrder: async(shippingAddress, totalItems, subTotalAmount, shippingCharge) => {
        try {
          const token = getAuthToken();
          const response = await axios.post(`${Backend_URL}/orders/createOrder`, {shippingAddress, totalItems, subTotalAmount, shippingCharge}, {
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
    listOrders: async(deliveryStatus, orderOn) => {
      try {
        const token = getAuthToken();
        const response = await axios.get(`${Backend_URL}/users/list-orders?orderStatus=${deliveryStatus}&orderDate=${orderOn}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        return response;
      } catch (error) {
        return error.response;
      }
    },
    getOrderInfo: async (orderId) => {
      try {
        const token = getAuthToken();
        const response = await axios.get(`${Backend_URL}/orders/getOrder/${orderId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        return response;
      } catch (error) {
        return error.response;
      }
    },
}

export default orderAPI;