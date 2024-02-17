import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import logo from "../assets/madMonkeyz.png";
import axios from "axios";
import { Backend_URL } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const token = localStorage.getItem("token") || "";

const Razorpay = ({ orderId, keyId, keySecret, currency, amount, order }) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);
  const navigate = useNavigate();

  const verifyPayment = async (orderDetails = {}) => {
    try {
      const response = await axios.post(
        `${Backend_URL}/payment/verify`,
        {
          order,
          paymentMethod: paymentMethod.current,
          orderDetails,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.status === 200) {
        navigate(`/order-history/${response.data.updatedOrder._id}`);
        toast.success(response.data.message);
      } else {
        toast.warning(response.data.message);
        console.log(response);
      }
    } catch (error) {
      navigate("/order-history");
      console.error("Error fetching payment:", error);
      toast.error(error.response.data.message);
    }
  };

  const loadRazorpay = async (options) => {

    // All information is loaded in options which we will discuss later.
    const rzp1 = new window.Razorpay(options);

    // If you want to retreive the chosen payment method.
    rzp1.on("payment.submit", (response) => {
      paymentMethod.current = response.method;
    });

    // To get payment id in case of failed transaction.
    rzp1.on("payment.failed", (response) => {
      paymentId.current = response.error.metadata.payment_id;
    });

    // to open razorpay checkout modal.
    rzp1.open();
  };

  // we will be filling this object in next step.
  const options = {
    key: keyId,
    amount,
    currency,
    name: "Emperor Polo",
    image: logo,
    description: "Test transaction",
    order_id: orderId,
    prefill: {
      name,
      email: "",
      phone_number: null,
    },
    config: {
      display: {
        hide: [
          {
            method: "wallet",
          },
          {
            method: "paylater",
          },
        ],
        preferences: {
          show_default_blocks: true,
        },
      },
    },
    // This handler menthod is always executed in case of succeeded payment
    handler: function (response) {
      console.log(response);
      verifyPayment(response);
    },
    modal: {
      confirm_close: true,
      // There can be 3 reasons when this modal is closed.
      ondismiss: async (reason) => {
        const {
          reason: paymentReason,
          field,
          step,
          code,
        } = reason && reason.error ? reason.error : {};
        // Reason 1 - when payment is cancelled. It can happend when we click cross icon or cancel any payment explicitly.
        if (reason === undefined) {
          console.log(reason);
          verifyPayment(reason);
        }
        // Reason 2 - When modal is auto closed because of time out
        else if (reason === "timeout") {
          verifyPayment(reason);
        }
        // Reason 3 - When payment gets failed.
        else {
          console.log("failed");
          verifyPayment("failed", {
            paymentReason,
            field,
            step,
            code,
          });
        }
      },
    },
    retry: {
      enabled: false,
    },
    timeout: 900,
    theme: {
      color: "#000000",
    },
  };

  useEffect(() => {
    loadRazorpay(options);
  }, []);

  return null;
};

export default Razorpay;