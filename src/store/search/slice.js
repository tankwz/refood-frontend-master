/** @format */

import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    foods: [],
  },
  reducers: {
    filterSearchFood: (state, { payload }) => ({
      ...state,
    }),
    findSearchFood: (state, { payload }) => ({
      ...state,
    }),
    updateSearchFood: (state, { payload }) => ({
      ...state,
      foods: payload.foods,
      countOnPage: payload.countOnPage,
      pageCurrent: payload.pageCur,
      pageNumber: payload.pageNum,
    }),
    findAllSearchFood: (state, { payload }) => ({
      ...state,
    }),
  },
});

export const {
  filterSearchFood,
  findSearchFood,
  updateSearchFood,
  findAllSearchFood,
} = searchSlice.actions;

export default searchSlice.reducer;
