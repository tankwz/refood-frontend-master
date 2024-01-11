/** @format */

import { createSlice } from "@reduxjs/toolkit";

const partySlice = createSlice({
  name: "party",
  initialState: {
    partys: [],
  },
  reducers: {
    findPartyAll: (state) => ({
      ...state,
    }),
    findSearchParty: (state, { payload }) => ({
      ...state,
    }),
    getAllParty: (state, { payload }) => ({
      ...state,
    }),
    updateSearchParty: (state, { payload }) => ({
      ...state,
      partys: payload.foods,
      countOnPage: payload.countOnPage,
      pageCurrent: payload.pageCur,
      pageNumber: payload.pageNum,
    }),
    updateTypeParty: (state, { payload }) => ({
      ...state,
      partys: payload,
    }),
    updateParty: (state, { payload }) => ({
      ...state,
      partys: payload.parties,
      countOnPage: payload.countOnPage,
      pageCurrent: payload.pageCur,
      pageNumber: payload.pageNum,
    }),
    createParty: (state, { payload }) => ({
      ...state,
      successParty: false,
    }),
    checkPartySuccess: (state, { payload }) => ({
      ...state,
      successParty: payload,
    }),
    getPartyDetail: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    updatePartyDetail: (state, { payload }) => ({
      ...state,
      partyDetail: payload.party_detail,
    }),
    deletePartyDetail: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
});

export const {
  findSearchParty,
  updateSearchParty,
  findPartyAll,
  createParty,
  checkPartySuccess,
  updateParty,
  getAllParty,
  updateTypeParty,
  getPartyDetail,
  updatePartyDetail,
  deletePartyDetail,
} = partySlice.actions;

export default partySlice.reducer;
