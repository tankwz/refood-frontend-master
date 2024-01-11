/** @format */

import { takeLatest } from "redux-saga/effects";
import {
  handleCreateOrderFood,
  handleDeleteOrderDetail,
  handleGetAllOrderFood,
  handleGetInvoiceDetail,
  handleGetInvoiceId,
  handleGetOrderDetail,
  handleVNPayOrder,
} from "./handlers";
import {
  createOrderFood,
  deleteOrderDetail,
  getAllOrderFood,
  getInvoiceDetail,
  getInvoiceId,
  getOrderDetail,
  getVNPAYOrder,
} from "./slice";

export default function* orderWatcher() {
  yield takeLatest(createOrderFood.type, handleCreateOrderFood);
  yield takeLatest(getVNPAYOrder.type, handleVNPayOrder);
  yield takeLatest(getAllOrderFood.type, handleGetAllOrderFood);
  yield takeLatest(getOrderDetail.type, handleGetOrderDetail);
  yield takeLatest(deleteOrderDetail.type, handleDeleteOrderDetail);
  yield takeLatest(getInvoiceId.type, handleGetInvoiceId);
  yield takeLatest(getInvoiceDetail.type, handleGetInvoiceDetail);
}
