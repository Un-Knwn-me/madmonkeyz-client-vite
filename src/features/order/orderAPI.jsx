import axios from "axios";
import { Backend_URL, token } from "../../App";

const orderAPI = {
    newOrder: async(shippingAddress, totalItems, subTotalAmount) => {
        try {
          const response = await axios.post(`${Backend_URL}/orders/createOrder`, {shippingAddress, totalItems, subTotalAmount}, {
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

export default orderAPI;