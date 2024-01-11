/** @format */

import styled from "styled-components";
import React from "react";
import ProductStar from "modules/products/ProductStar";
import DetailsMeta from "./DetailsMeta";
import DetailsEvaluate from "./DetailsEvaluate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviewFoodDetail } from "store/food/slice";

const data = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    star: 5,
    author: "Daniel",
    date: "10/10/2022",
    describe: "Món ăn tuyệt vời!",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    star: 5,
    author: "Lyly",
    date: "10/10/2022",
    describe: "Món ăn tuyệt vời!",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    star: 5,
    author: "Candy",
    date: "10/10/2022",
    describe: "Món ăn ngon!",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    star: 5,
    author: "Sera",
    date: "10/10/2022",
    describe: "Món ăn ngon!",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    star: 5,
    author: "Hery",
    date: "10/10/2022",
    describe: "Món ăn ngon!",
  },
];

const DetailsRateStyled = styled.div`
  display: flex;
  flex-direction: column;
  .rate-main {
    display: inline-flex;
    padding: 15px 0;
    border-bottom: 1px solid ${(props) => props.theme.grayBorder};
    gap: 20px;
  }
  .rate-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 1px solid ${(props) => props.theme.lineGray};
    background-color: ${(props) => props.theme.lightBlue};
    color: ${(props) => props.theme.text};
    cursor: pointer;
    span {
      font-size: 24px;
      font-weight: 700;
    }
  }
  .rate-content {
    width: 90%;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    .rate-content {
      width: 60%;
    }
  }
`;

const DetailsRate = () => {
  const { reviews } = useSelector((state) => state.food);

  return (
    <DetailsRateStyled>
      {reviews?.length > 0 ? (
        reviews?.map((item) => (
          <div className="rate-main" key={item.RatingID}>
            <div className="rate-img">
              <div>
                <span>{item.RatingCustomer.charAt(0)}</span>
              </div>
            </div>
            <div className="rate-content">
              <ProductStar
                className="mb-2 cursor-pointer"
                starNumber={item.RatingMark}
              ></ProductStar>
              <DetailsMeta data={item}></DetailsMeta>
            </div>
          </div>
        ))
      ) : (
        <span>Chưa có đánh giá</span>
      )}
    </DetailsRateStyled>
  );
};

export default DetailsRate;
