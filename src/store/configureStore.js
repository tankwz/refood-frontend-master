/** @format */

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";
import rootSaga from "./rootSaga";
import { reducer } from "./reducers";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: false,
    }).concat(logger, sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export { store };
