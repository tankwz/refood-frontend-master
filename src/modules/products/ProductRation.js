/** @format */

import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";

const ProductRationStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 12px;
  .ration-item {
    padding: 10px 20px;
    border: 1px solid ${(props) => props.theme.secondary};
    border-radius: 6px;
    background-color: ${(props) => props.theme.secondary1};
    cursor: pointer;
    color: ${(props) => props.theme.secondary};
    font-size: 16px;
    font-weight: 500;
  }
  .ration-active {
    border: 1px solid ${(props) => props.theme.primary};
    background-color: ${(props) => props.theme.lightBlue};
    color: ${(props) => props.theme.primary};
  }
  .ration-item:hover {
    opacity: 0.7;
    transition: all;
  }
  .ration-active:hover {
    opacity: 1;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    .ration-item {
      padding: 5px 10px;
      font-size: 14px;
    }
  }
`;

const ProductRation = ({ data, className = "", handleSelectRation }) => {
  const refRation = useRef(null);

  useEffect(() => {
    let rationSelector = document.getElementsByClassName("ration");
    const rationItem = rationSelector[0].children[0];
    rationItem.classList.add("ration-active");
    return () => {
      rationItem.classList.remove("ration-active");
    };
  }, []);

  useEffect(() => {
    handleSelectRation(data[0].FoodDetailID);
  }, []);

  const handleClickRation = (index, foodID) => {
    handleSelectRation(foodID, index);
    const ration = refRation.current.children;
    const rationActive = document.querySelectorAll(".ration-active");
    for (let i = 0; i < rationActive.length; i++) {
      rationActive[i].classList.remove("ration-active");
    }
    ration[index].classList.add("ration-active");
  };
  return (
    <ProductRationStyled ref={refRation} className={className}>
      {data.length > 0 &&
        data.map((ration, index) => (
          <div
            className="ration-item"
            key={ration.FoodRation}
            onClick={() => handleClickRation(index, ration.FoodDetailID)}
          >
            {ration.FoodRation} người
          </div>
        ))}
    </ProductRationStyled>
  );
};

export default ProductRation;
