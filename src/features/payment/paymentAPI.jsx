import axios from "axios";
import { Backend_URL} from "../../App";

export const getAuthToken = () => {
  return localStorage.getItem('token') || '';
};

const paymentAPI = {
    initiatePay: async(orderId) => {
        try {
          const token = getAuthToken();
          const response = await axios.post(`${Backend_URL}/payment/initiate`, {orderId}, {
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
}

export default paymentAPI;