/** @format */

import instance from "api";

export const getAllPartyApi = async (data) => {
  const { pageCur, numOnPage } = data;
  return await instance.request({
    method: "GET",
    url: `/party/get-all-parties/${pageCur}/${numOnPage}`,
  });
};

export const findPartyFoodApi = async (param) => {
  return await instance.request({
    method: "GET",
    url: `/food/find-foods?ration=10&${param}`,
  });
};

export const findPartyAllApi = async (data) => {
  const { pageCurrent, countOnPage } = data;
  return await instance.request({
    method: "GET",
    url: `/food/get-food-for-party/${pageCurrent}/${countOnPage}`,
  });
};

export const createPartyApi = async (data) => {
  return await instance.request({
    method: "POST",
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
    url: `/party/create-party`,
  });
};

export const getPartyDetailApi = async (param) => {
  return await instance.request({
    method: "GET",
    url: `/party/get-party-detail/${param}`,
  });
};

export const deletePartyDetailApi = async (param) => {
  return await instance.request({
    method: "DELETE",
    url: `/party/cancel-party/${param}`,
  });
};
