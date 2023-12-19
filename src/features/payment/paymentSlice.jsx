import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order_id: '',
    currency: '',
    amount: null
}

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        initiatePay: (state, action) => {
            state.order_id = action.payload.order_id;
            state.currency = action.payload.currency;
            state.amount = action.payload.amount;
        },  
    }
});

export const { initiatePay } = paymentSlice.actions
export default paymentSlice.reducer