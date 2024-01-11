/** @format */

import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductTitleStyled = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
  margin-bottom: 8px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const ProductTitle = ({ children, className = "", to = "" }) => {
  if (to) {
    return (
      <Link to={`/${to}`}>
        <ProductTitleStyled className={className}>
          {children}
        </ProductTitleStyled>
      </Link>
    );
  }
  return (
    <ProductTitleStyled className={className}>{children}</ProductTitleStyled>
  );
};

ProductTitle.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  to: PropTypes.string,
};

export default ProductTitle;
