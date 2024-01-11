/** @format */

import Layout from "components/layout/Layout";
import SectionLeft from "components/layout/SectionLeft";
import SectionRight from "components/layout/SectionRight";
import PartyLeft from "modules/party/PartyLeft";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const PartyPageStyled = styled.div`
  .party-main {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    padding-top: 30px;
    max-width: 1200px;
  }
`;

const PartyPage = () => {
  const location = useLocation();
  return (
    <Layout>
      <PartyPageStyled>
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
            Đặt tiệc
          </Link>
        </div>
        <div className="party-main">
          <SectionLeft className="section-left">
            <PartyLeft></PartyLeft>
          </SectionLeft>
          <SectionRight className="section-right">
            <Outlet></Outlet>
          </SectionRight>
        </div>
      </PartyPageStyled>
    </Layout>
  );
};

export default PartyPage;
