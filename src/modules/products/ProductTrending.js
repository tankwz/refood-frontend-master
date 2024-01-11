/** @format */
import styled from "styled-components";
import React from "react";
import ProductTitle from "./ProductTitle";
import ProductPrice from "./ProductPrice";
import ProductImage from "./ProductImage";
import priceVN from "utils/priceVN";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { page } from "utils/constants";
import { getAllFoodPagination } from "store/food/slice";
import { Link } from "react-router-dom";

const ProductTreding = styled.div`
  display: flex;
  flex-direction: column;
  .trend-heading {
    margin-bottom: 20px;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 600;
    color: ${(props) => props.theme.text};
    cursor: pointer;
    padding-top: 15px;
  }
  .trend-content {
    border: 1px solid ${(props) => props.theme.borderLight};
    border-radius: 6px;
    position: relative;
  }

  .trend-lists {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 12px;
    padding: 15px;
    cursor: pointer;
  }
  .trend-lists:hover {
    background-color: ${(props) => props.theme.borderLight};
    transform: all;
  }
  .trend-image {
    width: 70px;
    height: 70px;
    border-radius: 8px;
  }
  .trend-title {
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.text};
  }
  .trend-title:hover {
    color: ${(props) => props.theme.textPrimary};
    transition: all;
  }
`;

const ProductTrending = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    function fetchData() {
      dispatch(getAllFoodPagination(`${page.currentPage}/${page.countFood}`));
    }
    fetchData();
  }, [dispatch]);
  const { foods } = useSelector((state) => state.food);
  if (!foods) return null;
  return (
    <ProductTreding>
      <h3 className="trend-heading">Món ăn hot nhất</h3>
      <div className="trend-content">
        {foods.length > 0 &&
          foods.map((food, index) => {
            const { FoodName, FoodPrices, FoodImages, FoodSlug } = food;
            return (
              index < 9 && (
                <Link
                  to={`/${FoodSlug}`}
                  className="trend-lists"
                  key={FoodName}
                >
                  <ProductImage
                    url={FoodImages[0].FoodImageUrl}
                    className="trend-image"
                  ></ProductImage>
                  <div className="trend-info">
                    <ProductTitle className="trend-title">
                      {FoodName}
                    </ProductTitle>
                    {FoodPrices.length <= 1 ? (
                      <ProductPrice className="text-base">
                        {priceVN(FoodPrices[0].FoodPrice)}
                      </ProductPrice>
                    ) : (
                      <ProductPrice className="text-base">
                        {priceVN(FoodPrices[0].FoodPrice) +
                          "~" +
                          priceVN(FoodPrices[FoodPrices.length - 1].FoodPrice)}
                      </ProductPrice>
                    )}
                  </div>
                </Link>
              )
            );
          })}
      </div>
    </ProductTreding>
  );
};

export default ProductTrending;
