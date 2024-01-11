/** @format */

import Swal from "sweetalert2";

const {
  addCartApi,
  getCartDetailApi,
  deleteCartApi,
  updateCartApi,
} = require("api/cart");
const { call, put } = require("redux-saga/effects");
const { updateCart, getCartDetail, errorCart } = require("./slice");

function* handleAddCart({ payload }) {
  try {
    const response = yield call(addCartApi, payload);
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        text: response.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    yield put(getCartDetail());
  } catch (error) {
    const { message } = error.response.data;
    yield put(errorCart(message));
  }
}

function* handleGetCartDetail() {
  try {
    const response = yield call(getCartDetailApi);
    if (response.status === 200) {
      yield put(updateCart(response.data.cart_detail));
    }
  } catch (error) {
    const { message } = error.response.data;
    yield put(errorCart(message));
  }
}

function* handleUpdateCart({ payload }) {
  try {
    const response = yield call(updateCartApi, payload);
    if (response.status === 200) {
      yield put(getCartDetail());
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleDeleteCart({ payload }) {
  try {
    const response = yield call(deleteCartApi, payload);
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        text: response.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
      yield put(getCartDetail());
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

export {
  handleAddCart,
  handleGetCartDetail,
  handleUpdateCart,
  handleDeleteCart,
};
