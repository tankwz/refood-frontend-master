/** @format */

import { all, fork } from "redux-saga/effects";
import foodWatcher from "./food/saga";
import authWatcher from "./auth/saga";
import cartWatcher from "./cart/saga";
import searchWatcher from "./search/saga";
import orderWatcher from "./order/saga";
import partyWatcher from "./party/saga";

export default function* rootSaga() {
  yield all([
    fork(authWatcher),
    fork(foodWatcher),
    fork(cartWatcher),
    fork(searchWatcher),
    fork(orderWatcher),
    fork(partyWatcher),
  ]);
}
