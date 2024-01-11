/** @format */

import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {},
  reducers: {
    createOrderFood: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    updateOrderInfoFood: (state, { payload }) => ({
      ...state,
      message: payload.message,
      orderInfo: payload.order_info,
    }),
    initOrder: (state) => ({
      orderInfo: null,
      message: null,
    }),
    getVNPAYOrder: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    getUrlPay: (state, { payload }) => ({
      ...state,
      url: payload.url,
    }),
    getAllOrderFood: (state) => ({
      ...state,
    }),
    updateOrderFood: (state, { payload }) => ({
      ...state,
      orders: payload.orders,
      countOnPage: payload.countOnPage,
      pageCurrent: payload.pageCur,
      pageNumber: payload.pageNum,
    }),
    getOrderDetail: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    updateOrderDetail: (state, { payload }) => ({
      ...state,
      orderDetail: payload.order_detail,
    }),
    deleteOrderDetail: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    getInvoiceId: (state) => ({
      ...state,
    }),
    updateInvoiceId: (state, { payload }) => ({
      ...state,
      invoiceid: payload,
    }),
    getInvoiceDetail: (state) => ({
      ...state,
    }),
    updateInvoiceDetail: (state, { payload }) => ({
      ...state,
      invoiceDetail: payload,
    }),
  },
});

export const {
  createOrderFood,
  updateOrderInfoFood,
  initOrder,
  getVNPAYOrder,
  getUrlPay,
  getAllOrderFood,
  updateOrderFood,
  getOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
  getInvoiceId,
  updateInvoiceId,
  getInvoiceDetail,
  updateInvoiceDetail,
} = orderSlice.actions;

export default orderSlice.reducer;
