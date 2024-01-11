/** @format */

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllNewFood } from "store/food/slice";
import { page } from "utils/constants";
import ProductHeading from "./ProductHeading";
import ProductItem from "./ProductItem";
const queryString = require("query-string");

const ProductNew = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    function fetchData() {
      dispatch(getAllNewFood(`${page.currentPage}/${page.countFood}/`));
    }
    fetchData();
  }, [dispatch]);

  const navigate = useNavigate();
  const handleAllFoodNew = () => {
    try {
      const query = queryString.stringifyUrl({
        url: `${page.currentPage}/${page.countFood}/`,
        query: { page: 1 },
      });
      dispatch(getAllNewFood(query));
      navigate("/food/new?page=1");
    } catch (error) {
      console.log(error);
    }
  };

  const { foodNews } = useSelector((state) => state.food);
  if (!foodNews) return null;
  return (
    <div className="mb-10">
      <ProductHeading
        title="Món ăn mới"
        view="Xem tất cả"
        onClick={handleAllFoodNew}
      ></ProductHeading>
      <div className="flex-layout grid-row">
        {foodNews?.length > 0 &&
          foodNews?.map((food, index) => (
            <ProductItem key={food.FoodName} data={food}></ProductItem>
          ))}
      </div>
    </div>
  );
};

export default ProductNew;
