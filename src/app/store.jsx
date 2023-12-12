import { configureStore } from "@reduxjs/toolkit"
import userReducer from '../features/user/userSlice';
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/cart/cartSlice';

const store = configureStore({
    reducer: {
        userInfo: userReducer,
        products: productReducer,
        cart: cartReducer
    }
  })

  export default store