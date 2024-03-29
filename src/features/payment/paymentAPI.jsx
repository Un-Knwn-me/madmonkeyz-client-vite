import axios from "axios";
import { Backend_URL } from "../../App";

const getAuthToken = () => {
  return localStorage.getItem("token") || "";
};

const paymentAPI = {
  initiatePay: async (orderId) => {
    try {
      const response = await axios.post(
        `${Backend_URL}/payment/initiate`,
        { orderId },
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
  verifyPayment: async ({
    status, orderDetails
  }) => {
    try {
      const response = await axios.post(
        `${Backend_URL}/payment/verify`,
        JSON.stringify({ status, orderDetails }),
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

export default paymentAPI;
