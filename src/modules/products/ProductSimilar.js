/** @format */

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFood } from "store/food/slice";
import ProductHeading from "./ProductHeading";
import ProductList from "./ProductList";

const ProductSimilar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    function fetchData() {
      dispatch(getAllFood());
    }
    fetchData();
  }, [dispatch]);
  const { foods } = useSelector((state) => state.food);
  if (!foods) return null;
  return (
    <div>
      <ProductHeading
        title="Món ăn liên quan"
        view="Xem tất cả"
      ></ProductHeading>
      <ProductList data={foods}></ProductList>
    </div>
  );
};

export default ProductSimilar;
