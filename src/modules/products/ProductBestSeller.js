/** @format */

import React, { useEffect } from "react";
import ProductList from "./ProductList";
import ProductHeading from "./ProductHeading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { page } from "utils/constants";
import { getAllPopularFood } from "store/food/slice";
const queryString = require("query-string");

const ProductBestSeller = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    function fetchData() {
      dispatch(getAllPopularFood(`${page.currentPage}/${page.countFood}/`));
    }
    fetchData();
  }, [dispatch]);

  const navigate = useNavigate();
  const handleAllFoodBestSell = () => {
    const query = queryString.stringifyUrl({
      url: `${page.currentPage}/${page.countFood}/`,
      query: { page: 1 },
    });
    try {
      dispatch(getAllPopularFood(query));
      navigate("/food/populars?page=1");
    } catch (error) {
      console.log(error);
    }
  };

  const { foodPopulars } = useSelector((state) => state.food);
  if (!foodPopulars) return null;
  return (
    <div className="mb-10">
      <ProductHeading
        title="Món ăn bán chạy"
        view="Xem tất cả"
        onClick={handleAllFoodBestSell}
      ></ProductHeading>
      <ProductList data={foodPopulars}></ProductList>
    </div>
  );
};

export default ProductBestSeller;
