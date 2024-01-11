/** @format */

import styled from "styled-components";
import React, { useEffect } from "react";
import ProductSimilar from "modules/products/ProductSimilar";
import Layout from "components/layout/Layout";
import DetailsReview from "modules/details/DetailsReview";
import DetailsContent from "modules/details/DetailsContent";
import DetailsComment from "modules/details/DetailsComment";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetailsPageStyled = styled.div`
  background-color: #f7f8fd;
  padding-bottom: 50px;
  .dt-similar {
    margin-top: 60px;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px 40px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .dt-content {
      flex-wrap: wrap;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .dt-content {
      flex-wrap: wrap;
    }
  }
  @media (min-width: 320px) and (max-width: 767px) {
    .dt-content {
      flex-wrap: wrap;
      padding: 0;
    }
  }
`;
const ProductDetailsPage = () => {
  const { foodDetails } = useSelector((state) => state.food);
  const location = useLocation();

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.pathname]);
  return (
    <Layout>
      <div className="pb-10 bg-[#f7f8fd]"></div>
      <ProductDetailsPageStyled>
        <div className="container">
          <div className="flex items-center justify-start gap-1 py-4 uppercase">
            <Link to="/" className="text-lg font-medium text-text">
              Trang chủ
            </Link>
            <span className="mb-1 font-medium text-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
            <Link
              to={location.pathname}
              className="text-lg font-medium cursor-default text-textLight"
            >
              {foodDetails?.FoodName}
            </Link>
          </div>
          <DetailsContent className="dt-content"></DetailsContent>
          <DetailsReview></DetailsReview>
          <div className="dt-similar">
            <ProductSimilar></ProductSimilar>
          </div>
          <DetailsComment></DetailsComment>
        </div>
      </ProductDetailsPageStyled>
    </Layout>
  );
};

export default ProductDetailsPage;
