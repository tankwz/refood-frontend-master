/** @format */

import UserSideBar from "modules/profile/UserSideBar";
import styled from "styled-components";
import SectionRight from "components/layout/SectionRight";
import SectionLeft from "components/layout/SectionLeft";
import React from "react";
import Layout from "components/layout/Layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import LinkPage from "components/common/LinkPage";

const UserPageStyled = styled.div`
  padding-bottom: 40px;
  background-color: ${(props) => props.theme.grayDark};
  .user-main {
    display: flex;
    margin: 0 auto;
    max-width: 1200px;
  }

  .user-right {
    border: 1px solid ${(props) => props.theme.line};
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 13%);
    background: #fff;
  }
  .user-content {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }
  .user-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
  .user-name {
    width: 20%;
    text-align: end;
  }
  .user-input {
    width: 462px;
  }
  .user-btn {
    padding-top: 15px;
    display: flex;
    justify-content: center;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    .user-right {
      border: none;
      border-radius: 0px;
    }
    .user-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 10px;
    }
    .user-name {
      text-align: left;
      font-size: 14px;
      width: 100%;
    }
    .user-input {
      width: 100%;
    }
  }
`;

const UserPage = () => {
  const location = useLocation();
  return (
    <Layout>
      <div className="flex items-center justify-start gap-1 px-16 py-6 uppercase bg-grayDark">
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
          to="/user/account/profile"
          className="text-lg font-medium text-text"
        >
          thông tin khách hàng
        </Link>
        <LinkPage link={location.pathname}></LinkPage>
      </div>
      <UserPageStyled>
        <div className="user-main">
          <SectionLeft className="section-left">
            <UserSideBar></UserSideBar>
          </SectionLeft>
          <SectionRight className="section-right user-right">
            <Outlet></Outlet>
          </SectionRight>
        </div>
      </UserPageStyled>
    </Layout>
  );
};

export default UserPage;
