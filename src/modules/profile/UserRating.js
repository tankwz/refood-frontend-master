/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderFood } from "store/order/slice";
import styled from "styled-components";
import UserHeading from "./UserHeading";
const UserRatingStyled = styled.div``;

const UserRating = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  useEffect(() => {
    function fetchAllOrder() {
      dispatch(getAllOrderFood({ pageCur: 1, numOnPage: 999 }));
    }
    fetchAllOrder();
  }, [dispatch]);

  // const data = orders ? orders : [];

  return (
    <UserRatingStyled>
      <UserHeading title="Thông tin đánh giá"></UserHeading>
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
            {/* {data?.length > 0 &&
              data.map((item) => {
                if (item.OrderState === 2) {
                  return (
                    <RatingList
                      orderId={item.OrderID}
                      key={item.OrderID}
                    ></RatingList>
                  );
                }
                return "";
              })} */}
          </tbody>
        </table>
      </div>
    </UserRatingStyled>
  );
};

export default UserRating;
