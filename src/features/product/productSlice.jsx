import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: true,
  productList: [],
  productDetails: {}
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    listProducts: (state, action) => {
      state.loading = false;
      state.productList = action.payload;
    },
    productInfo: (state, action) => {
      state.loading = false;
      state.productDetails = action.payload;
    }
  }
});

export const { listProducts, productInfo } = productSlice.actions

export default productSlice.reducer