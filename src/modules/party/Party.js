/** @format */

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { findPartyAll } from "store/party/slice";
import PartyItem from "./PartyItem";

const Party = () => {
  const [nextPage, setNextPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const { partys, pageNumber } = useSelector((state) => state.party);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function fetchAllParty() {
      if (location.pathname === "/party")
        dispatch(findPartyAll({ pageCurrent: 1, countOnPage: 12 }));
    }
    fetchAllParty();
  }, [dispatch, location.pathname]);

  const handleClickAllParty = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (!partys || !partys.length) return;
    setPageCount(pageNumber);
  }, [partys, nextPage, pageNumber]);

  const handlePageClick = (event) => {
    setNextPage(event.selected + 1);
    dispatch(
      dispatch(
        findPartyAll({ pageCurrent: event.selected + 1, countOnPage: 12 })
      )
    );
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      <div>
        <div className="flex items-center gap-4 mb-6">
          <span
            className="px-3 py-3 text-white rounded cursor-pointer bg-primary hover:opacity-90"
            onClick={handleClickAllParty}
          >
            Xem tất cả
          </span>
          <span
            className="px-3 py-3 text-white rounded cursor-pointer bg-secondary hover:opacity-90"
            onClick={() => navigate("/party/create")}
          >
            Đặt tiệc ngay
          </span>
        </div>
        {partys?.length > 0 ? (
          <div>
            <div className="flex-layout grid-row">
              {partys?.map((party, index) => (
                <PartyItem key={index} data={party}></PartyItem>
              ))}
            </div>
            <div className="flex justify-center mt-10 bg-white rounded">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                className="pagination"
              />
            </div>
          </div>
        ) : (
          <span>Không có món ăn nào được tìm thấy!</span>
        )}
      </div>
    </>
  );
};

export default Party;
