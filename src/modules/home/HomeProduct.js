/** @format */

import styled from "styled-components";
import SectionRight from "components/layout/SectionRight";
import SectionLeft from "components/layout/SectionLeft";
import React from "react";
import ProductTrending from "modules/products/ProductTrending";
import ProductNew from "modules/products/ProductNew";
import ProductBestSeller from "modules/products/ProductBestSeller";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFood } from "store/food/slice";

const HomeProductStyled = styled.section`
  padding-top: 40px;
  margin-bottom: 40px;
  .product-main {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 1200px;
  }
`;

const HomeProduct = () => {
  // Get all food from database
  const { foods } = useSelector((state) => state.food);

  const dispatch = useDispatch();
  useEffect(() => {
    function fetchData() {
      dispatch(getAllFood());
    }
    fetchData();
  }, [dispatch]);

  if (!foods) return null;
  return (
    <HomeProductStyled>
      <div className="product-main">
        <SectionLeft className="section-left">
          <ProductTrending></ProductTrending>
          <img
            src="https://images.unsplash.com/photo-1586511934875-5c5411eebf79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
            alt=""
            className="object-cover w-full rounded "
          />
          <div className="p-4 border rounded border-line">
            <div className="flex justify-between gap-4 py-3 border-b cursor-default border-b-line">
              <div className="w-[50px] h-[40px]">
                <img
                  src="/smartphone.png"
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm italic text-text1">
                Tải ứng dụng Refood lên máy của bạn
              </span>
            </div>
            <div className="flex justify-between gap-4 py-3 border-b cursor-default border-b-line">
              <div className="w-[50px] h-[40px] ">
                <img
                  src="/order.png"
                  alt=""
                  className="object-cover w-full h-full "
                />
              </div>
              <span className="text-sm italic text-text1">
                Đặt đơn dễ dàng và nhanh chóng
              </span>
            </div>
            <div className="flex justify-between gap-4 py-3 border-b cursor-default border-b-line">
              <div className="w-[50px] h-[40px]">
                <img
                  src="/delivery.png"
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm italic text-text1">
                Đơn hàng sẽ được giao trong vòng 30 phút
              </span>
            </div>
          </div>
        </SectionLeft>
        <SectionRight className="section-right">
          <ProductBestSeller></ProductBestSeller>
          <ProductNew></ProductNew>
        </SectionRight>
      </div>
    </HomeProductStyled>
  );
};

export default React.memo(HomeProduct);
