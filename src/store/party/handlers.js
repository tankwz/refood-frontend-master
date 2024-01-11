/** @format */

import {
  createPartyApi,
  deletePartyDetailApi,
  findPartyAllApi,
  findPartyFoodApi,
  getAllPartyApi,
  getPartyDetailApi,
} from "api/party";
import { toast } from "react-toastify";
import { call, put } from "redux-saga/effects";
import Swal from "sweetalert2";
import {
  checkPartySuccess,
  updateParty,
  updatePartyDetail,
  updateSearchParty,
  updateTypeParty,
} from "./slice";

/** @format */
function* handlePartyAll({ payload }) {
  try {
    const response = yield call(findPartyAllApi, payload);
    if (response.status === 200) {
      yield put(updateSearchParty(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handlePartyType({ payload }) {
  try {
    const response = yield call(findPartyFoodApi, payload);
    if (response.status === 200) {
      const { foodByType } = response.data;
      yield put(updateTypeParty(foodByType));
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleCreateParty({ payload }) {
  try {
    const response = yield call(createPartyApi, payload);
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        text: response.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
      yield put(checkPartySuccess(response.data.success));
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message, {
      position: "top-right",
    });
  }
}

function* handleGetPartyAll({ payload }) {
  try {
    const response = yield call(getAllPartyApi, payload);
    if (response.status === 200) {
      yield put(updateParty(response.data));
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleGetPartyDetail({ payload }) {
  try {
    const response = yield call(getPartyDetailApi, payload);
    if (response.status === 200) {
      yield put(updatePartyDetail(response.data));
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleDeletePartyDetail({ payload }) {
  try {
    const response = yield call(deletePartyDetailApi, payload);
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

export {
  handlePartyType,
  handlePartyAll,
  handleCreateParty,
  handleGetPartyAll,
  handleGetPartyDetail,
  handleDeletePartyDetail,
};
