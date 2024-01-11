/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="py-8 border-t border-t-line bg-grayDark">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-3 pb-5">
          <div className="flex items-center justify-start gap-5">
            <span className="p-3 border rounded-full cursor-default text-primary bg-primary bg-opacity-10 border-primary">
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
                  d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                />
              </svg>
            </span>
            <div className="flex flex-col gap-2">
              <span className="text-xl font-medium text-text">
                0123-456-789
              </span>
              <span className="text-base text-text">
                Giờ làm việc: 08:00 - 22:00
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-end gap-2">
              <a href="/#">
                <img src="/facebook.png" alt="" className="w-[30px] h-[30px]" />
              </a>
              <a href="/#">
                <img
                  src="/instagram.png"
                  alt=""
                  className="w-[30px] h-[30px]"
                />
              </a>
            </div>
            <div className="flex items-end justify-start gap-4">
              <span className="text-xs font-medium lg:text-base md:text-base text-text">
                Tải app lên điện thoại
              </span>
              <div className="flex items-end justify-start gap-2">
                <a href="https://play.google.com/store">
                  <img src="/google-play.png" alt="" />
                </a>
                <a href="https://www.apple.com/app-store">
                  <img src="/app-store.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5 border-t border-t-line text-text1">
          <p>Copyright 2022 © Võ Minh Kha</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
