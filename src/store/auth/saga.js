/** @format */

import { takeLatest } from "redux-saga/effects";
import {
  handleAddAddress,
  handleAuthLogin,
  handleAuthRegister,
  handleGetAddressDetail,
  handleGetAllAddress,
  handleGetUser,
  handleUpdateAddress,
  logOut,
} from "./handlers";
import {
  authAddAddress,
  authGetAddressDetail,
  authGetAllAddress,
  authLogin,
  authLogOut,
  authGetUser,
  authRegister,
  updateAddress,
} from "./slice";

export default function* authWatcher() {
  yield takeLatest(authRegister.type, handleAuthRegister);
  yield takeLatest(authLogin.type, handleAuthLogin);
  yield takeLatest(authLogOut.type, logOut);
  yield takeLatest(authGetUser.type, handleGetUser);
  yield takeLatest(authGetAddressDetail.type, handleGetAddressDetail);
  yield takeLatest(authAddAddress.type, handleAddAddress);
  yield takeLatest(authGetAllAddress.type, handleGetAllAddress);
  yield takeLatest(updateAddress.type, handleUpdateAddress);
}
