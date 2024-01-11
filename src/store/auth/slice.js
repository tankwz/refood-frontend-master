/** @format */

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    accessToken: null,
    addresses: [],
  },
  reducers: {
    authLogin: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    authRegister: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    authGetUser: (state) => ({
      ...state,
    }),
    authUpdateUser: (state, { payload }) => ({
      ...state,
      user: payload.customer_info,
      accessToken: payload.access_token,
    }),
    authLogOut: (state, action) => ({}),
    authGetAllAddress: (state) => ({
      ...state,
    }),
    authAddAddress: (state) => ({
      ...state,
    }),
    authGetAddressDetail: (state, { payload }) => ({
      ...state,
    }),
    authUpdateAddressInfo: (state, { payload }) => {
      return {
        ...state,
        addressInfo: payload,
      };
    },
    authUpdateAddress: (state, { payload }) => ({
      ...state,
      addresses: payload,
    }),
    updateAddress: (state) => ({
      ...state,
      addresses: [],
      addressInfo: {},
    }),
  },
});

export const {
  authLogin,
  authRegister,
  authGetUser,
  authUpdateUser,
  authLogOut,
  authGetAllAddress,
  authGetAddressDetail,
  authUpdateAddressInfo,
  authUpdateAddress,
  authAddAddress,
  updateAddress,
} = authSlice.actions;

export default authSlice.reducer;
