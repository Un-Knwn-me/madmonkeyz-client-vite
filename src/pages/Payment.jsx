import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Razorpay from "../components/Razorpay";
import paymentAPI from "../features/payment/paymentAPI";
import { initiatePay } from "../features/payment/paymentSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Checkout = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [displayRazorpay, setDisplayRazorpay] = useState(false);

  const { order_id, currency, amount } = useSelector((state) => state.payment);

  const initiatePayment = async (orderId) => {
    try {
      const response = await paymentAPI.initiatePay(orderId);
      
      if (response.status === 200) {
        dispatch(initiatePay(response.data));
        setDisplayRazorpay(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    initiatePayment(orderId);
  }, [orderId]);

  return (
    <div>
      {displayRazorpay ? (
        <Razorpay
          amount={amount}
          orderId={order_id}
          currency={currency}
          keyId={import.meta.env.VITE_RAZORPAY_KEY_ID}
          keySecret={import.meta.env.VITE_RAZORPAY_KEY_SECRET}
          order={orderId}
        />
      ) : <Loader/> }
    </div>
  );
};

export default Checkout;
