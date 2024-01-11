/** @format */

import instance from "api";

export const registerApi = async (user) =>
  await instance.request({ method: "POST", data: user, url: "/auth/register" });

export const loginApi = async (user) => {
  console.log("user", user);
  return await instance.request({
    method: "POST",
    data: user,
    url: "/auth/login",
  });
};

export const getUserApi = async () =>
  await instance.request({ method: "GET", url: "/auth/info" });

export const updateUserInfoApi = async (user) =>
  await instance.request({
    method: "PUT",
    data: user,
    url: "/auth/update/info",
  });

export const updateUserPassApi = async (user) =>
  await instance.request({
    method: "PUT",
    data: user,
    url: "/auth/update/password",
  });

export const getDistrictApi = async () =>
  await instance.request({ method: "GET", url: "/cantho-units/get-districts" });

export const getWardApi = async (districtId) =>
  await instance.request({
    method: "GET",
    url: `/cantho-units/get-wards/${districtId}`,
  });

export const getAllAddressApi = async () =>
  await instance.request({ method: "GET", url: "/auth/get-addresses" });

export const getAddressDetailApi = async (id) =>
  await instance.request({
    method: "GET",
    url: `/auth/get-address-detail/${id}`,
  });

export const addAddressApi = async (address) =>
  await instance.request({
    method: "POST",
    data: address,
    url: "/auth/add/address",
  });

export const updateAddressApi = async (address) =>
  await instance.request({
    method: "PUT",
    data: address,
    url: "/auth/update/address",
  });

export const deleteAddressApi = async (id) =>
  await instance.request({
    method: "DELETE",
    url: `/auth/delete/address/${id}`,
  });
