/** @format */

import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    foods: [],
  },
  reducers: {
    getAllFood: (state, { payload }) => ({
      ...state,
    }),
    updateAllFood: (state, { payload }) => ({
      ...state,
      foods: payload,
    }),
    getAllFoodPagination: (state) => ({
      ...state,
      foods: [],
    }),
    getAllPopularFood: (state) => ({
      ...state,
      foodPopulars: [],
    }),
    updateAllFoodPopular: (state, { payload }) => ({
      ...state,
      foodPopulars: payload.foods,
      countOnPage: payload.countOnPage,
      pageCurrent: payload.pageCur,
      pageNumber: payload.pageNum,
    }),
    getAllNewFood: (state) => ({
      ...state,
      foodNews: [],
    }),
    updateAllFoodNew: (state, { payload }) => ({
      ...state,
      foodNews: payload.foods,
      countOnPage: payload.countOnPage,
      pageCurrent: payload.pageCur,
      pageNumber: payload.pageNum,
    }),
    updateAllFoodPagination: (state, { payload }) => ({
      ...state,
      foods: payload.foods,
      countOnPage: payload.countOnPage,
      pageCurrent: payload.pageCur,
      pageNumber: payload.pageNum,
    }),
    getFoodDetails: (state, { payload }) => ({
      ...state,
    }),
    updateFoodDetails: (state, { payload }) => ({
      ...state,
      foodDetails: payload,
    }),
    getCommentDetails: (state, { payload }) => ({
      ...state,
    }),
    updateCommentDetails: (state, { payload }) => ({
      ...state,
      comments: payload.comments,
      countAllComment: payload.countAll,
    }),
    addCommentDetails: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    deleteComment: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    getAllTypesFood: (state) => ({
      ...state,
    }),
    updateTypesFood: (state, { payload }) => ({
      ...state,
      typesFood: payload,
    }),
    addReviewFood: (state, { payload }) => ({
      ...state,
    }),
    getReviewFoodDetail: (state, { payload }) => ({
      ...state,
    }),
    updateReviewFoodDetail: (state, { payload }) => ({
      ...state,
      reviews: payload.reviews,
      avgReview: payload.TB,
    }),
  },
});

export const {
  getAllFood,
  updateAllFood,
  getFoodDetails,
  updateFoodDetails,
  getCommentDetails,
  updateCommentDetails,
  addCommentDetails,
  deleteComment,
  getAllFoodPagination,
  updateAllFoodPagination,
  getAllTypesFood,
  updateTypesFood,
  getAllPopularFood,
  updateAllFoodPopular,
  getAllNewFood,
  updateAllFoodNew,
  addReviewFood,
  getReviewFoodDetail,
  updateReviewFoodDetail,
} = foodSlice.actions;

export default foodSlice.reducer;
