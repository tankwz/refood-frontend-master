/** @format */

import { takeLatest } from "redux-saga/effects";
import {
  handleAddCart,
  handleGetCartDetail,
  handleDeleteCart,
  handleUpdateCart,
} from "./handlers";
import { addCart, deleteCart, getCartDetail, updateCartItem } from "./slice";

export default function* cartWatcher() {
  yield takeLatest(addCart.type, handleAddCart);
  yield takeLatest(getCartDetail.type, handleGetCartDetail);
  yield takeLatest(updateCartItem.type, handleUpdateCart);
  yield takeLatest(deleteCart.type, handleDeleteCart);
}
