import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: localStorage.getItem("userId") || "",
  userName: localStorage.getItem("userName")
    ? JSON.parse(localStorage.getItem("userName"))
    : null,
  wishlist: [],
  address: [],
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
      state.wishlist = action.payload.wishlist;
      state.address = action.payload.address;
      localStorage.setItem("userName", JSON.stringify(action.payload.userName));
      localStorage.setItem("userId", action.payload.userId);
    },
    loginFail: () => {},
    logOut: () => {
      state.isLoggedIn = false;
      state.userName = "";
    },
    manageWishlist: (state, action) => {
      state.wishlist = action.payload.wishlistItems;
    },
  },
});

export const { loggedIn, loginFail, logOut, manageWishlist } =
  userSlice.actions;

export default userSlice.reducer;
