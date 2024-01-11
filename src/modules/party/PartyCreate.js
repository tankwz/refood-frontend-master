/** @format */

import Layout from "components/layout/Layout";
import { useCart } from "contexts/cart-context";
import CartList from "modules/cart/CartList";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import priceVN from "utils/priceVN";
import PartyForm from "./PartyForm";

const PartyCreateStyled = styled.div``;

const PartyCreate = () => {
  const [total] = useCart();
  return (
    <Layout>
      <PartyCreateStyled>
        <div className="container">
          <div className="flex justify-center mt-10">
            <h3 className="text-3xl font-semibold uppercase text-text">
              Danh sách món ăn
            </h3>
          </div>
          <div className="flex justify-center mt-5">
            {total > 0 ? (
              <CartList></CartList>
            ) : (
              <div className="flex flex-col justify-center">
                <span className="flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#ea2b0f"
                    className="w-20 h-20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </span>
                <span className="flex justify-center pt-5 text-xl lg:text-2xl text-text">
                  Giỏ hàng đang trống.{" "}
                  <Link to={"/party"} className="pl-1 text-primary">
                    {" "}
                    Tìm món ăn!!
                  </Link>
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-5 mt-10">
            <span className="text-2xl font-semibold text-text">Tạm tính: </span>
            <span className="text-2xl font-medium text-redPrimary">
              {priceVN(total)} / 1 bàn
            </span>
          </div>
          <div className="flex items-center justify-center mt-5 mb-10">
            <PartyForm></PartyForm>
          </div>
        </div>
      </PartyCreateStyled>
    </Layout>
  );
};

export default PartyCreate;
