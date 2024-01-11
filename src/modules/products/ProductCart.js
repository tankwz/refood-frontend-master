/** @format */

import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";

const ProductCartStyled = styled.div`
  width: 100%;
  height: 34px;
  border: 1px solid ${(props) => props.theme.blueBold};
  border-radius: 30px;
  background-color: transparent;
  padding: 0 20px;
  color: ${(props) => props.theme.blueBold};
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  flex-shrink: 0;
`;

const ProductCart = ({ className = "", onClick = () => {} }) => {
  return (
    <ProductCartStyled
      className={`hover:bg-blueBold hover:text-white hover:transition-all ${className}`}
      onClick={onClick}
    >
      Thêm giỏ hàng
    </ProductCartStyled>
  );
};

ProductCart.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default ProductCart;
