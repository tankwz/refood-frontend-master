/** @format */

import styled from "styled-components";
import React from "react";
import CartTable from "./CartTable";
import { useSelector } from "react-redux";

const CartListStyled = styled.div`
  width: 820px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .cl-image {
    width: 56px;
    height: 56px;
    border-radius: 6px;
  }

  .pur-scroll::-webkit-scrollbar {
    height: 6px;
  }
`;

const CartList = ({ className = "" }) => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <CartListStyled
      className={`overflow-x-auto cursor-default scroll ${className}`}
    >
      <table className="lg:w-full w-[1026px] table-cart">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Món ăn</th>
            <th>Giá</th>
            <th>Khẩu phần</th>
            <th>Số lượng</th>
            <th>Tạm tính</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {cart?.length > 0 ? (
            cart.map((item) => (
              <CartTable key={item.FoodDetailID} data={item}></CartTable>
            ))
          ) : (
            <span>Không có món ăn trong giỏ hàng</span>
          )}
        </tbody>
      </table>
    </CartListStyled>
  );
};

export default CartList;
