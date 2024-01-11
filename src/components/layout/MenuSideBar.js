/** @format */

import React from "react";
import SearchInput from "modules/search/SearchInput";
import { Button } from "components/button";
import { useNavigate } from "react-router-dom";

const MenuSideBar = ({ closeModal }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between pb-5 border-b border-b-line">
        <div className="w-[120px] h-[30px]">
          <img
            src="/refood-logo.png"
            alt=""
            className="object-cover w-full h-auto"
          />
        </div>
        <span
          className="p-1 text-white border rounded-full cursor-pointer border-primary bg-primary"
          onClick={closeModal}
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
      <div className="mt-5">
        <SearchInput></SearchInput>
      </div>
      <div className="mt-8">
        <ul>
          <li className="px-2 py-2 text-lg font-medium tracking-wide uppercase border-b cursor-pointer border-b-line hover:bg-primary hover:text-primary hover:bg-opacity-10 text-text">
            <a href="/">Trang chủ</a>
          </li>
          <li className="px-2 py-2 text-lg font-medium tracking-wide uppercase border-b cursor-pointer border-b-line hover:bg-primary hover:text-primary hover:bg-opacity-10 text-text">
            <a href="/food">Thực đơn</a>
          </li>
          <li className="px-2 py-2 text-lg font-medium tracking-wide uppercase border-b cursor-pointer border-b-line hover:bg-primary hover:text-primary hover:bg-opacity-10 text-text">
            <a href="/contact">Liên hệ</a>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <Button
          kind="primary"
          height="44px"
          className="w-full"
          onClick={() => {
            navigate("/login");
          }}
        >
          Đăng nhập
        </Button>
        <Button
          kind="not-bg"
          height="44px"
          className="w-full"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Đăng ký
        </Button>
      </div>
    </div>
  );
};

export default MenuSideBar;
