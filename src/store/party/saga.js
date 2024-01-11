/** @format */

import { takeLatest } from "redux-saga/effects";
import { deleteOrderDetail } from "store/order/slice";
import {
  handleCreateParty,
  handleDeletePartyDetail,
  handleGetPartyAll,
  handleGetPartyDetail,
  handlePartyAll,
  handlePartyType,
} from "./handlers";
import {
  createParty,
  findPartyAll,
  findSearchParty,
  getAllParty,
  getPartyDetail,
} from "./slice";

export default function* partyWatcher() {
  yield takeLatest(findSearchParty.type, handlePartyType);
  yield takeLatest(findPartyAll.type, handlePartyAll);
  yield takeLatest(createParty.type, handleCreateParty);
  yield takeLatest(getAllParty.type, handleGetPartyAll);
  yield takeLatest(getPartyDetail.type, handleGetPartyDetail);
  yield takeLatest(deleteOrderDetail.type, handleDeletePartyDetail);
}
