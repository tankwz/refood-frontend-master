/** @format */

import ReactPaginate from "react-paginate";
import React from "react";
import ProductItem from "modules/products/ProductItem";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { page } from "utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { filterSearchFood } from "store/search/slice";
const queryString = require("query-string");

const Search = () => {
  const [nextPage, setNextPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [parse, setParse] = useState("");
  const { foods, pageNumber } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const parsed = queryString.parse(location.search);

  useEffect(() => {
    if (!foods || !foods.length) return;
    setPageCount(pageNumber);
  }, [foods, nextPage, pageNumber]);

  useEffect(() => {
    if (parse) {
      const values = queryString.stringify(parse);
      navigate(`/food/find-foods?${values}`);
    }
  }, [navigate, parse]);

  const handlePageClick = (event) => {
    setNextPage(event.selected + 1);
    let obj = { ...parsed, page: event.selected + 1 };
    setParse(obj);
    dispatch(
      filterSearchFood(
        `${event.selected + 1}/${page.countFood}${location.search}`
      )
    );
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      {foods.length > 0 ? (
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
            Không tìm thấy món ăn
          </span>
        </div>
      )}
    </>
  );
};

export default Search;
