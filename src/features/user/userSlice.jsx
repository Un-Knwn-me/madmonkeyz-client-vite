import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    userName: localStorage.getItem("userName")  ? JSON.parse(localStorage.getItem("userName")) : null,
    userId: null,
    hipSize: null,
    shirtSize: null,
    address: [],
}

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
      state.hipSize = action.payload.hipSize;
      state.shirtSize = action.payload.shirtSize;
      state.address = action.payload.address;
      localStorage.setItem("userName", JSON.stringify(action.payload.userName));
    },
    loginFail: () => {},
    logOut: () => {
      state.isLoggedIn = false;
      state.userName = ''
    },
  }
});

export const { loggedIn, loginFail, logOut } = userSlice.actions

export default userSlice.reducer