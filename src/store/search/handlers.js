/** @format */

import {
  filterFoodApi,
  findFoodApi,
  getFindAllSearchFoodApi,
} from "api/search";
import { call, put } from "redux-saga/effects";
import { updateSearchFood } from "./slice";

function* handleSearchFilter({ payload }) {
  try {
    const response = yield call(filterFoodApi, payload);
    if (response.status === 200) {
      yield put(updateSearchFood(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleSearchFoodAdvanced({ payload }) {
  try {
    const response = yield call(findFoodApi, payload);
    const { foodByName, foodByPrices, foodByRation, foodByReview, foodByType } =
      response.data;
    const foods = foodByName.concat(
      foodByPrices,
      foodByRation,
      foodByReview,
      foodByType
    );

    if (response.status === 200) {
      yield put(updateSearchFood(foods));
    }
  } catch (error) {
    // const { message } = error.response.data;
    console.log(error);
  }
}

function* handleFindAllSearchFood({ payload }) {
  try {
    const response = yield call(getFindAllSearchFoodApi, payload);
    if (response.status === 200) {
      yield put(updateSearchFood(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  handleSearchFilter,
  handleSearchFoodAdvanced,
  handleFindAllSearchFood,
};
