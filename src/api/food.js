/** @format */

import instance from "api";

export const getAllFoodApi = async () =>
  await instance.request({ method: "GET", url: `/food/get-foods` });

export const getAllPaginationFoodApi = async (param) => {
  return await instance.request({
    method: "GET",
    url: `/food/get-foods/${param}`,
  });
};

export const getFoodDetailApi = async (param) => {
  return await instance.request({
    method: "GET",
    url: `/food/get-food-details/${param}`,
  });
};

export const getFoodCommentApi = async (data) => {
  const { foodId, page } = data;
  return await instance.request({
    method: "GET",
    url: `/food/get-food-comments/${foodId}?limit=${page}`,
  });
};

export const addFoodCommentApi = async (comment) => {
  return await instance.request({
    method: "POST",
    data: comment,
    url: `/food/add-comment`,
  });
};

export const deleteFoodCommentApi = async (comment) => {
  return await instance.request({
    method: "DELETE",
    data: comment,
    url: `/food/delete-comment`,
  });
};

export const getAllTypesFoodApi = async () =>
  await instance.request({ method: "GET", url: `/food/get-foodtypes` });

export const getAllPopularFoodApi = async (param) => {
  return await instance.request({
    method: "GET",
    url: `/food/get-popular-foods/${param}`,
  });
};

export const getAllNewFoodApi = async (param) => {
  return await instance.request({
    method: "GET",
    url: `/food/get-new-foods/${param}`,
  });
};

export const addReviewFoodApi = async (data) => {
  return await instance.request({
    method: "POST",
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
    url: `/food/add-review`,
  });
};

export const getReviewFoodDetailApi = async (param) => {
  return await instance.request({
    method: "GET",
    url: `/food/get-reviews/${param.foodid}`,
  });
};
