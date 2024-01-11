/** @format */

import styled from "styled-components";
import React from "react";
import ProductPrice from "modules/products/ProductPrice";
import priceVN from "utils/priceVN";
import { useCart } from "contexts/cart-context";
import { feeDelivery } from "utils/constants";
import { Button } from "components/button";
import { useNavigate } from "react-router-dom";

const CartTotalStyled = styled.div`
  width: 320px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  .total-heading {
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.textPrimary};
  }
  .total-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: ${(props) => props.theme.text};
    }
  }
`;

const CartTotal = () => {
  const [total] = useCart();
  const navigate = useNavigate();
  return (
    <CartTotalStyled>
      <h3 className="total-heading">Đơn hàng tạm tính</h3>
      <div className="total-item">
        <span>Tổng đơn hàng:</span>
        <ProductPrice>{priceVN(total)}</ProductPrice>
      </div>
      <div className="total-item">
        <span>Phí giao hàng:</span>
        <ProductPrice>{priceVN(feeDelivery.fee)}</ProductPrice>
      </div>
      <div className="total-item">
        <span>Tổng thanh toán:</span>
        <ProductPrice>{priceVN(feeDelivery.fee + total)}</ProductPrice>
      </div>
      <div className="mt-5">
        <Button
          height="44px"
          className="w-full"
          onClick={() => {
            navigate("/order");
          }}
        >
          Tiếp tục
        </Button>
      </div>
    </CartTotalStyled>
  );
};

export default CartTotal;
