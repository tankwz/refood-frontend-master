/** @format */

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderFood } from "store/order/slice";
import UserHeading from "./UserHeading";
import styled from "styled-components";
import PartyList from "modules/party/PartyList";
import { getAllParty } from "store/party/slice";

const UserPartyStyled = styled.div`
  .pur-scroll::-webkit-scrollbar {
    height: 6px;
  }
`;

const UserParty = () => {
  const [nextPage, setNextPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const dispatch = useDispatch();
  const { partys, pageNumber } = useSelector((state) => state.party);
  useEffect(() => {
    function fetchAllParty() {
      dispatch(getAllParty({ pageCur: 1, numOnPage: 5 }));
    }
    fetchAllParty();
  }, [dispatch]);

  const data = partys ? partys : [];
  useEffect(() => {
    if (!partys || !partys.length) return;
    setPageCount(pageNumber);
  }, [partys, nextPage, pageNumber]);

  const handlePageClick = (event) => {
    setNextPage(event.selected + 1);
    dispatch(
      getAllParty({
        pageCur: event.selected + 1,
        numOnPage: 5,
      })
    );
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <UserPartyStyled>
      <UserHeading title="Thông tin đơn đặt tiệc"></UserHeading>
      <div className="w-full overflow-x-auto cursor-default scroll pur-scroll">
        <table className="lg:w-full w-[1060px]">
          <thead>
            <tr>
              <th>ID</th>
              <th>Thời gian đãi tiệc</th>
              <th>Địa điểm</th>
              <th>Số bàn</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data.map((item) => (
                <PartyList data={item} key={item.PartyID}></PartyList>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8 bg-white rounded lg:justify-end">
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
    </UserPartyStyled>
  );
};

export default UserParty;
