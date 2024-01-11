/** @format */

import { Button } from "components/button";
import { Quantity } from "components/quantity";
import useGetCount from "hooks/useGetCount";
import ProductImage from "modules/products/ProductImage";
import ProductPrice from "modules/products/ProductPrice";
import ProductRation from "modules/products/ProductRation";
import ProductTitle from "modules/products/ProductTitle";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "store/cart/slice";
import styled from "styled-components";
import priceVN from "utils/priceVN";

const AddCartModalStyled = styled.div`
  .cart-title {
    .title {
      font-size: 20px;
      margin-bottom: 0;
    }
  }
`;

const AddCartModal = ({ closeModal, data }) => {
  const [ration, setRation] = useState("");
  const [price, setPrice] = useState("");
  const { getCount, handleSetGetCount } = useGetCount();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const price = priceVN(data?.FoodPrices[0].FoodPrice);
      setPrice(price);
    }
  }, [data]);

  const handleSelectRation = (foodID, index) => {
    setRation(foodID);
    setPrice(priceVN(data?.FoodPrices[index]?.FoodPrice));
  };

  const handleAddCart = () => {
    dispatch(
      addCart({
        mactma: ration,
        count: getCount,
      })
    );
    closeModal();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <AddCartModalStyled>
      <div className="flex items-start justify-between pb-3 mb-3 border-b border-b-line">
        <h3 className="text-xl font-medium text-text">Thêm vào giỏ hàng</h3>
        <div
          className="transition-all cursor-pointer text-text hover:text-redPrimary"
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
        </div>
      </div>
      <div className="lg:w-[500px] md:w-[500px] w-[300px] flex flex-col gap-5 px-4">
        <div className="flex items-start justify-start gap-8">
          <div className="w-[80px] h-[80px] rounded">
            <ProductImage
              className="h-full"
              url={data?.FoodThumb}
            ></ProductImage>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <div className="cart-title">
              <ProductTitle className="title">{data?.FoodName}</ProductTitle>
            </div>
            <div className="detail-quantity">
              <Quantity
                name="count"
                handleSetGetCount={handleSetGetCount}
              ></Quantity>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-start gap-6">
            <span className="font-medium text-text">Khẩu phần:</span>
            <ProductRation
              data={data?.FoodPrices}
              className="ration"
              handleSelectRation={handleSelectRation}
            ></ProductRation>
          </div>
          <div className="flex items-center justify-start gap-11">
            <span className="font-medium text-text">Mức giá:</span>
            <ProductPrice sizeText="24px">{price}</ProductPrice>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            height="44px"
            className="hover:opacity-90"
            onClick={handleAddCart}
          >
            Thêm giỏ hàng
          </Button>
        </div>
      </div>
    </AddCartModalStyled>
  );
};

export default AddCartModal;
