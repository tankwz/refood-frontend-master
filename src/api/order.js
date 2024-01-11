/** @format */

import instance from "api";

export const createOrderApi = async (order) => {
  return await instance.request({
    method: "POST",
    data: order,
    url: `/order/create-food-order`,
  });
};

export const vnPayOrderApi = async (param) => {
  return await instance.request({
    method: "GET",
    url: `/order/pay-for-food-order/${param}`,
  });
};

export const getAllOrderApi = async (data) => {
  const { pageCur, numOnPage } = data;
  return await instance.request({
    method: "GET",
    url: `/order/get-all-food-orders/${pageCur}/${numOnPage}`,
  });
};

export const getOrderDetailApi = async (param) => {
  return await instance.request({
    method: "GET",
    url: `/order/get-food-order-detail/${param}`,
  });
};

export const deleteOrderDetailApi = async (param) => {
  return await instance.request({
    method: "DELETE",
    url: `/order/cancel-food-order/${param}`,
  });
};

export const getInvoiceIdApi = async (param) => {
  return await instance.request({
    method: "GET",
    url: `/invoice/get-invoice-of-order/${param}`,
  });
};

export const getInvoiceDetailApi = async (param) => {
  return await instance.request({
    method: "GET",
    url: `/invoice/get-invoice-detail/${param}`,
  });
};
