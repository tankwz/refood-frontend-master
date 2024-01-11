/** @format */

import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductImageStyled = styled.img`
  border-radius: inherit;
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
`;

const ProductImage = ({
  className = "",
  url = "",
  to = "",
  onClick = () => {},
}) => {
  if (to) {
    return (
      <Link to={`/${to}`} className="w-full">
        <ProductImageStyled
          src={url}
          alt=""
          className={className}
          onClick={onClick}
        ></ProductImageStyled>
      </Link>
    );
  }
  return (
    <>
      <ProductImageStyled
        src={url}
        alt=""
        className={className}
        onClick={onClick}
      ></ProductImageStyled>
    </>
  );
};

ProductImage.propTypes = {
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
};

export default ProductImage;
