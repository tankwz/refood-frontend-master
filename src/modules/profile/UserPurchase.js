/** @format */

import OrderItem from "modules/order/OrderItem";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderFood } from "store/order/slice";
import styled from "styled-components";
import UserHeading from "./UserHeading";

const UserPurchaseStyled = styled.div`
  .pur-scroll::-webkit-scrollbar {
    height: 6px;
  }
`;

const UserPurchase = () => {
  const [nextPage, setNextPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const dispatch = useDispatch();
  const { orders, pageNumber } = useSelector((state) => state.order);
  useEffect(() => {
    function fetchAllOrder() {
      dispatch(getAllOrderFood({ pageCur: 1, numOnPage: 5 }));
    }
    fetchAllOrder();
  }, [dispatch]);

  const data = orders ? orders : [];
  useEffect(() => {
    if (!orders || !orders.length) return;
    setPageCount(pageNumber);
  }, [orders, nextPage, pageNumber]);

  const handlePageClick = (event) => {
    setNextPage(event.selected + 1);
    dispatch(
      getAllOrderFood({
        pageCur: event.selected + 1,
        numOnPage: 5,
      })
    );
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <UserPurchaseStyled>
      <UserHeading title="Thông tin đơn mua"></UserHeading>
      <div className="w-full overflow-x-auto cursor-default scroll pur-scroll">
        <table className="lg:w-full w-[1060px]">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ngày</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data.map((item) => (
                <OrderItem data={item} key={item.OrderID}></OrderItem>
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
    </UserPurchaseStyled>
  );
};

export default UserPurchase;
