/** @format */

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addCart: (state) => ({
      ...state,
    }),
    getCartDetail: (state) => ({
      ...state,
    }),
    updateCart: (state, { payload }) => ({
      ...state,
      cart: payload,
    }),
    updateCartItem: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    deleteCart: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    errorCart: (state, { payload }) => ({
      ...state,
      message: payload,
      cart: [],
    }),
  },
});

export const {
  addCart,
  updateCart,
  getCartDetail,
  updateCartItem,
  deleteCart,
  errorCart,
} = cartSlice.actions;

export default cartSlice.reducer;
