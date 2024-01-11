/** @format */

import styled from "styled-components";
import React from "react";
import ProductTitle from "modules/products/ProductTitle";
import ProductPrice from "modules/products/ProductPrice";
import ProductImage from "modules/products/ProductImage";
import priceVN from "../../utils/priceVN";
import PropTypes from "prop-types";

const CartItemStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  .ct-image {
    width: 56px;
    height: 56px;
    border-radius: 6px;
  }
  .ct-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .ct-title {
    font-size: 16px;
    color: ${(props) => props.theme.textPrimary};
  }
  .ct-entry {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 6px;
    color: ${(props) => props.theme.red};
    font-size: 14px;
  }
  .ct-price {
    color: ${(props) => props.theme.red};
    font-size: 14px;
  }
`;

const CartItem = ({ data }) => {
  if (!data) return null;
  return (
    <CartItemStyled>
      <div className="ct-image">
        <ProductImage url={data.FoodThumb}></ProductImage>
      </div>
      <div className="ct-content">
        <ProductTitle className="ct-title">{data.FoodName}</ProductTitle>
        <div className="ct-entry">
          <span className="ct-quantity">{data.FoodDishCount}</span>
          <span className="text-text">x</span>
          <ProductPrice className="ct-price">
            {priceVN(data.FoodPrice)}
          </ProductPrice>
        </div>
      </div>
    </CartItemStyled>
  );
};

CartItem.propTypes = {
  data: PropTypes.object,
};

export default CartItem;
