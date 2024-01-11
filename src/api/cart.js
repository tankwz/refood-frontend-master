/** @format */

import instance from "api";

export const addCartApi = async (cartItem) => {
  return await instance.request({
    method: "POST",
    data: cartItem,
    url: `/cart/add-to-cart`,
  });
};

export const getCartDetailApi = async () => {
  return await instance.request({
    method: "GET",
    url: `/cart/get-cart-detail`,
  });
};

export const updateCartApi = async (cartItem) => {
  return await instance.request({
    method: "POST",
    data: cartItem,
    url: `/cart/update-cart`,
  });
};

export const deleteCartApi = async (mactma) => {
  return await instance.request({
    method: "DELETE",
    data: mactma,
    url: `/cart/delete-cart-detail`,
  });
};
