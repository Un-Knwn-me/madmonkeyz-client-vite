import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: true,
  homeProducts: [],
  productList: [],
  productDetails: {}
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    homeList: (state, action) => {
      state.loading = false;
      state.homeProducts = action.payload;
    },
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

export const { listProducts, productInfo, homeList } = productSlice.actions

export default productSlice.reducer