import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderId: '',
    totalAmout: 0
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createOrder: (state, action) => {
            state.orderId = action.payload.orderId;
            state.totalAmout = action.payload.totalAmout;
        },  
    }
});

export const { createOrder } = orderSlice.actions
export default orderSlice.reducer