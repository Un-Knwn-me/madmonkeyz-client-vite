import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: true,
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    userAddress: localStorage.getItem("userAddress") ? JSON.parse(localStorage.getItem("userAddress")) : [],
    cartTotalQuantity: 0,
    subtotal: 0,
    totalSaving: 0
}
 
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        getItems: (state, action) => {
            state.loading = false;
            state.cartItems = action.payload.cart;
            state.userAddress = action.payload.userAddress;
            localStorage.setItem("cartItems", JSON.stringify(action.payload.cart));
            localStorage.setItem("userAddress", JSON.stringify(action.payload.userAddress));
        },
        addItems: (state, action) => {
            state.cartItems = action.payload.cart;
            localStorage.setItem("cartItems", JSON.stringify(action.payload.cart));
        },
        updateItems: (state, action) => {
            state.cartItems = action.payload.cart;
            localStorage.setItem("cartItems", JSON.stringify(action.payload.cart));
        },
        removeItems: (state, action) => {
            state.cartItems = action.payload.cart;
            localStorage.setItem("cartItems", JSON.stringify(action.payload.cart));
        },
        calculateTotals: (state, action) => {
            let {subtotal, quantity, totalSaving} = state.cartItems.reduce((cartTotal, cartItem)=>{
                const { salesPrice, quantity, price } = cartItem;
                const itemTotal = salesPrice * quantity;
                const itemSaving = (price - salesPrice) * quantity;

                cartTotal.subtotal += itemTotal
                cartTotal.quantity += quantity
                cartTotal.totalSaving += itemSaving

                return cartTotal
            }, {
                subtotal: 0,
                quantity: 0,
                totalSaving: 0
            })

            state.subtotal = subtotal;
            state.totalSaving = totalSaving;
            state.cartTotalQuantity = quantity;
        },
        addNewAdress: (state, action) => {
            state.userAddress = action.payload.userAddress;
        }
    }
});

export const { getItems, addItems, updateItems, removeItems, calculateTotals, addNewAdress } = cartSlice.actions
export default cartSlice.reducer