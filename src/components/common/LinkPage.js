/** @format */

import React from "react";
import { Link } from "react-router-dom";

const LinkPage = ({ link }) => {
  switch (link) {
    case "/user/account/profile":
      return (
        <>
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
            to={link}
            className="text-lg font-medium cursor-default text-textLight"
          >
            hồ sơ
          </Link>
        </>
      );
    case "/user/account/address":
      return (
        <>
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
            to={link}
            className="text-lg font-medium cursor-default text-textLight"
          >
            địa chỉ
          </Link>
        </>
      );
    case "/user/account/password":
      return (
        <>
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
            to={link}
            className="text-lg font-medium cursor-default text-textLight"
          >
            đổi mật khẩu
          </Link>
        </>
      );
    case "/user/party":
      return (
        <>
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
            to={link}
            className="text-lg font-medium cursor-default text-textLight"
          >
            cập nhật đơn đặt tiệc
          </Link>
        </>
      );
    case "/user/rating":
      return (
        <>
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
            to={link}
            className="text-lg font-medium cursor-default text-textLight"
          >
            cập nhật đánh giá
          </Link>
        </>
      );
    case "/user/order":
      return (
        <>
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
            to={link}
            className="text-lg font-medium cursor-default text-textLight"
          >
            cập nhật đơn mua
          </Link>
        </>
      );
    case "/user/order/detail":
      return (
        <>
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
          <Link to={"/user/order"} className="text-lg font-medium text-text">
            cập nhật đơn mua
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
            to={link}
            className="text-lg font-medium cursor-default text-textLight"
          >
            chi tiết
          </Link>
        </>
      );

    default:
      break;
  }
};

export default LinkPage;
