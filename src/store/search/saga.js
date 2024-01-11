/** @format */

import { takeLatest } from "redux-saga/effects";
import {
  handleFindAllSearchFood,
  handleSearchFilter,
  handleSearchFoodAdvanced,
} from "./handlers";
import { filterSearchFood, findAllSearchFood, findSearchFood } from "./slice";

export default function* searchWatcher() {
  yield takeLatest(filterSearchFood.type, handleSearchFilter);
  yield takeLatest(findSearchFood.type, handleSearchFoodAdvanced);
  yield takeLatest(findAllSearchFood.type, handleFindAllSearchFood);
}
