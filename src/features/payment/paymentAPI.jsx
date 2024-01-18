import axios from "axios";
import { Backend_URL} from "../../App";


const paymentAPI = {
    initiatePay: async(orderId) => {
        try {
          const response = await axios.post(`${Backend_URL}/payment/initiate`, {orderId}, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          });
          return response;
        } catch (error) {
          return error.response;
        }
      },
}

export default paymentAPI;