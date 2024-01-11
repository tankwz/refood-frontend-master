/** @format */

import { toast } from "react-toastify";
import Swal from "sweetalert2";

const {
  getAllFoodApi,
  getFoodDetailApi,
  getFoodCommentApi,
  addFoodCommentApi,
  deleteFoodCommentApi,
  getAllPaginationFoodApi,
  getAllTypesFoodApi,
  getAllPopularFoodApi,
  getAllNewFoodApi,
  addReviewFoodApi,
  getReviewFoodDetailApi,
} = require("api/food");
const { call, put } = require("redux-saga/effects");
const {
  updateAllFood,
  updateFoodDetails,
  updateCommentDetails,
  updateAllFoodPagination,
  updateTypesFood,
  updateAllFoodPopular,
  updateAllFoodNew,
  updateReviewFoodDetail,
} = require("./slice");

function* handleGetAllFoods() {
  try {
    const response = yield call(getAllFoodApi);
    if (response.status === 200) {
      yield put(updateAllFood(response.data.foods));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleGetAllFoodPagination({ payload }) {
  try {
    const response = yield call(getAllPaginationFoodApi, payload);
    if (response.status === 200) {
      yield put(updateAllFoodPagination(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleGetAllPopularFood({ payload }) {
  try {
    const response = yield call(getAllPopularFoodApi, payload);
    if (response.status === 200) {
      yield put(updateAllFoodPopular(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleGetAllNewFood({ payload }) {
  try {
    const response = yield call(getAllNewFoodApi, payload);
    if (response.status === 200) {
      yield put(updateAllFoodNew(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleGetFoodDetail({ payload }) {
  try {
    const response = yield call(getFoodDetailApi, payload);
    if (response.status === 200) {
      yield put(updateFoodDetails(response.data.food_info));
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleGetCommentDetails({ payload }) {
  try {
    const response = yield call(getFoodCommentApi, payload);
    if (response.status === 200) {
      yield put(updateCommentDetails(response.data));
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleAddCommentDetails({ payload }) {
  try {
    const response = yield call(addFoodCommentApi, payload);
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        text: response.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message, {
      position: "bottom-right",
    });
  }
}

function* handleDeleteComment({ payload }) {
  try {
    const response = yield call(deleteFoodCommentApi, payload);
    Swal.fire({
      position: "center",
      icon: "success",
      text: response.data.message,
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleGetAllTypesFood() {
  try {
    const response = yield call(getAllTypesFoodApi);
    if (response.status === 200) {
      yield put(updateTypesFood(response.data.foodtypes));
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

function* handleAddReviewFood({ payload }) {
  try {
    const response = yield call(addReviewFoodApi, payload);
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        text: response.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    const { message } = error.response.data;
    toast.error(message, {
      position: "bottom-right",
    });
  }
}

function* handleGetReviewFoodDetail({ payload }) {
  try {
    const response = yield call(getReviewFoodDetailApi, payload);
    if (response.status === 200) {
      yield put(updateReviewFoodDetail(response.data.reviews));
    }
  } catch (error) {
    const { message } = error.response.data;
    console.log(message);
  }
}

export {
  handleGetAllFoods,
  handleGetFoodDetail,
  handleGetCommentDetails,
  handleAddCommentDetails,
  handleDeleteComment,
  handleGetAllFoodPagination,
  handleGetAllTypesFood,
  handleGetAllPopularFood,
  handleGetAllNewFood,
  handleAddReviewFood,
  handleGetReviewFoodDetail,
};
