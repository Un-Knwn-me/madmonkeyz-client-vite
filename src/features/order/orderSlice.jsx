import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    orderList: [],
    orderDetails: {},
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
        orderHistory: (state, action) => {
            state.loading = false;
            state.orderList = action.payload;
        },
        orderInfo: (state, action) => {
            state.loading = false;
            state.orderDetails = action.payload.orderInfo;
        }  
    }
});

export const { createOrder, orderHistory, orderInfo } = orderSlice.actions
export default orderSlice.reducer