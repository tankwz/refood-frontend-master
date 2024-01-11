/** @format */

import ReactPaginate from "react-paginate";
import React from "react";
import ProductItem from "./ProductItem";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { page } from "utils/constants";
import { getAllFoodPagination } from "store/food/slice";
import { useLocation, useNavigate } from "react-router-dom";
const queryString = require("query-string");

const ProductAll = () => {
  const [nextPage, setNextPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [parse, setParse] = useState("");
  const { foods, pageNumber } = useSelector((state) => state.food);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  useEffect(() => {
    function fetchData() {
      dispatch(getAllFoodPagination(`${page.currentPage}/${page.countFood}`));
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!foods || !foods.length) return;
    setPageCount(pageNumber);
  }, [foods, nextPage, pageNumber]);

  useEffect(() => {
    if (parse) {
      const values = queryString.stringify(parse);
      navigate(`/food?${values}`);
    }
  }, [navigate, parse]);

  const handlePageClick = (event) => {
    setNextPage(event.selected + 1);
    let obj = { ...parsed, page: event.selected + 1 };
    setParse(obj);
    dispatch(
      getAllFoodPagination(
        `${event.selected + 1}/${page.countFood}${location.search}`
      )
    );
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div>
        {foods.length ? (
          <div>
            <div className="flex-layout grid-row">
              {foods.map((food) => (
                <ProductItem key={food.FoodName} data={food}></ProductItem>
              ))}
            </div>
            <div className="flex justify-center mt-10 bg-white rounded">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                className="pagination"
              />
            </div>
          </div>
        ) : (
          <span>Không có món ăn nào được tìm thấy!</span>
        )}
      </div>
    </>
  );
};

export default ProductAll;
