import { configureStore } from "@reduxjs/toolkit"
import userReducer from '../features/user/userSlice';
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import paymentReducer from '../features/payment/paymentSlice';

const store = configureStore({
    reducer: {
        userInfo: userReducer,
        products: productReducer,
        cart: cartReducer,
        order: orderReducer,
        payment: paymentReducer
    }
  })

  export default store;