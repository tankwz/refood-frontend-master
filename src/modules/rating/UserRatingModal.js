/** @format */

import { Button } from "components/button";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReviewFood } from "store/food/slice";
import RatingStar from "./RatingStar";

const UserRatingModal = ({ closeModal, foodId }) => {
  const [selectRating, setSelectRating] = useState(0);
  const dispatch = useDispatch();
  const handleRating = () => {
    const formData = new FormData();
    formData.append("foodid", foodId);
    formData.append("ratescore", selectRating);
    dispatch(addReviewFood(formData));
    closeModal();
  };
  return (
    <div className="lg:w-[500px] md:w-[500px] w-[300px]">
      <div className="flex justify-center mb-5">
        <h3 className="text-2xl font-semibold uppercase text-text">
          Mức độ hài lòng
        </h3>
      </div>
      <div className="flex justify-center">
        <RatingStar setSelectRating={setSelectRating}></RatingStar>
      </div>
      <div className="flex justify-center mt-5" onClick={handleRating}>
        <Button kind="primary" height="44px">
          Đánh giá
        </Button>
      </div>
    </div>
  );
};

export default UserRatingModal;
