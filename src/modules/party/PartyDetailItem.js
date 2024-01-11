/** @format */

import { Button } from "components/button";
import ModalComponent from "components/modal/ModalComponent";
import useModal from "hooks/useModal";
import ProductImage from "modules/products/ProductImage";
import ProductPrice from "modules/products/ProductPrice";
import UserRatingModal from "modules/rating/UserRatingModal";
import React, { useState } from "react";
import priceVN from "utils/priceVN";

const PartyDetailItem = ({ data, partyNumOfTable, partyState }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const [foodId, setFoodId] = useState("");
  const handleClickRating = (id) => {
    setFoodId(id);
    openModal();
  };
  return (
    <>
      {data?.length > 0 &&
        data.map((item) => (
          <div
            className="flex items-start justify-start gap-4 pb-2 border-b lg:gap-8 md:gap-8 border-b-line"
            key={item.FoodId}
          >
            <div className="lg:max-w-[80px] lg:h-[80px] w-full max-w-[60px] h-[60px] rounded-md">
              <ProductImage url={item.FoodThumb}></ProductImage>
            </div>
            <div className="flex flex-col w-full gap-3">
              <h3 className="text-base text-text lg:text-lg">
                {item.FoodName}
              </h3>
              <div className="flex items-center gap-2">
                <div className="hidden lg:block md:block">
                  <ProductPrice sizeText="18px">
                    {priceVN(item.FoodPrice)}
                  </ProductPrice>
                </div>
                <div className="block lg:hidden md:hidđen">
                  <ProductPrice sizeText="16px">
                    {priceVN(item.FoodPrice)}
                  </ProductPrice>
                </div>
                <span className="text-xs font-light lg:text-base md:text-base text-text1">
                  x {partyNumOfTable} bàn
                </span>
              </div>
              <div>
                <div className="inline px-2 py-1 text-xs font-medium text-center border rounded-sm lg:text-sm text-primary bg-bgPrimary border-primary">
                  {item.FoodType}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <ProductPrice sizeText="18px">{priceVN(item.Total)}</ProductPrice>
              {partyState === 2 && (
                <>
                  <Button
                    kind="primary"
                    height="40px"
                    className="w-[120px]"
                    onClick={() => handleClickRating(item?.FoodId)}
                  >
                    Đánh giá
                  </Button>
                  <ModalComponent
                    modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                  >
                    <UserRatingModal
                      closeModal={closeModal}
                      className="create-rating"
                      foodId={foodId}
                    ></UserRatingModal>
                  </ModalComponent>
                </>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default PartyDetailItem;
