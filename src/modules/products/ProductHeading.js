/** @format */
import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import { Button } from "components/button";

const ProductHeadingStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  cursor: default;
  .heading-title {
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.text};
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 3px solid ${(props) => props.theme.primary};
  }
  .heading-view {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0 20px;
    border-radius: 30px;
    height: 34px;
    border: 1px solid ${(props) => props.theme.line};
    font-size: 12px;
  }
  .heading-view:hover {
    border: 1px solid ${(props) => props.theme.grayLine};
    color: ${(props) => props.theme.text};
    transition: all;
  }
  // Mobiles
  @media (min-width: 320px) and (max-width: 767px) {
    // Product
    .heading-view {
      display: none;
    }
  }
`;

const ProductHeading = ({ title = "", view = "", onClick = () => {} }) => {
  return (
    <ProductHeadingStyled>
      <h4 className="heading-title">{title}</h4>
      <Button className="heading-view" kind="none" onClick={onClick}>
        <span>{view}</span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </span>
      </Button>
    </ProductHeadingStyled>
  );
};

ProductHeading.propTypes = {
  title: PropTypes.string,
  view: PropTypes.string,
  onClick: PropTypes.func,
};

export default ProductHeading;
