import axios from "axios";
import { Backend_URL, getAuthToken } from "../../App";

const token = getAuthToken();

const orderAPI = {
    newOrder: async(shippingAddress, totalItems, subTotalAmount, shippingCharge) => {
        try {
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