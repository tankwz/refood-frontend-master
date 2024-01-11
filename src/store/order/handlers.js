/** @format */

import Swal from "sweetalert2";

const {
  createOrderApi,
  vnPayOrderApi,
  getAllOrderApi,
  getOrderDetailApi,
  deleteOrderDetailApi,
  getInvoiceIdApi,
  getInvoiceDetailApi,
} = require("api/order");
const { call, put } = require("redux-saga/effects");
const {
  updateOrderInfoFood,
  getUrlPay,
  updateOrderFood,
  updateOrderDetail,
  updateInvoiceId,
  updateInvoiceDetail,
} = require("./slice");

function* handleCreateOrderFood({ payload }) {
  try {
    const response = yield call(createOrderApi, payload);
    if (response.status === 200) {
      yield put(updateOrderInfoFood(response.data));
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleVNPayOrder({ payload }) {
  try {
    const response = yield call(vnPayOrderApi, payload);
    if (response.status === 200) {
      yield put(getUrlPay(response.data));
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleGetAllOrderFood({ payload }) {
  try {
    const response = yield call(getAllOrderApi, payload);
    if (response.status === 200) {
      yield put(updateOrderFood(response.data));
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleGetOrderDetail({ payload }) {
  try {
    const response = yield call(getOrderDetailApi, payload);
    if (response.status === 200) {
      yield put(updateOrderDetail(response.data));
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleDeleteOrderDetail({ payload }) {
  try {
    const response = yield call(deleteOrderDetailApi, payload);
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        text: response.data.message,
        showConfirmButton: false,
        timer: 2500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleGetInvoiceId({ payload }) {
  try {
    const response = yield call(getInvoiceIdApi, payload);
    if (response.status === 200) {
      yield put(updateInvoiceId(response.data.invoiceid));
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleGetInvoiceDetail({ payload }) {
  try {
    const response = yield call(getInvoiceDetailApi, payload);
    if (response.status === 200) {
      yield put(updateInvoiceDetail(response.data.invoice_detail));
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

export {
  handleCreateOrderFood,
  handleVNPayOrder,
  handleGetAllOrderFood,
  handleGetOrderDetail,
  handleDeleteOrderDetail,
  handleGetInvoiceId,
  handleGetInvoiceDetail,
};
