/** @format */

import styled from "styled-components";
import SectionRight from "components/layout/SectionRight";
import SectionLeft from "components/layout/SectionLeft";
import React from "react";
import ProductLeft from "modules/products/ProductLeft";
import Layout from "components/layout/Layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Dropdown } from "components/dropdown";

const ProductPageStyled = styled.div`
  .pp-main {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 1200px;
    padding-top: 30px;
  }
  .pp-heading {
    padding: 15px;
    border-radius: 8px;
    background-color: ${(props) => props.theme.grayDark};
    margin-bottom: 20px;
  }
  .pp-dropdown {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }
  .pp-select {
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.text};
    gap: 10px;
  }
  .pp-list {
    width: 250px;
    top: calc(100% + 15px);
    div {
      font-size: 14px;
    }
  }
  .pp-number {
    width: 80px;
    top: calc(100% + 15px);
    left: auto;
    right: 20px;
    div {
      font-size: 14px;
    }
  }
`;

const ProductPage = () => {
  const location = useLocation();
  return (
    <Layout>
      <ProductPageStyled>
        <div className="flex items-center justify-start gap-1 px-8 py-6 uppercase bg-grayDark">
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
            Món ăn
          </Link>
        </div>
        <div className="pp-main">
          <SectionLeft className="section-left">
            <ProductLeft></ProductLeft>
          </SectionLeft>
          <SectionRight className="section-right">
            <>
              <div className="pp-heading">
                <div className="pp-dropdown">
                  <div className="pp-page">
                    <Dropdown>
                      <Dropdown.Select
                        placeholder="Hiển thị 12"
                        className="pp-select"
                        sizeIcon="w-4 h-4"
                      ></Dropdown.Select>
                      <Dropdown.List className="pp-number">
                        <Dropdown.Option>12</Dropdown.Option>
                        <Dropdown.Option>24</Dropdown.Option>
                        <Dropdown.Option>36</Dropdown.Option>
                        <Dropdown.Option>48</Dropdown.Option>
                      </Dropdown.List>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <Outlet></Outlet>
            </>
          </SectionRight>
        </div>
      </ProductPageStyled>
    </Layout>
  );
};

export default ProductPage;
