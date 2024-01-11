/** @format */

import styled from "styled-components";
import React from "react";
import { useSelector } from "react-redux";

const DetailsDescStyled = styled.div`
  transition: 3s all linear;
`;

const DetailsDesc = () => {
  const { foodDetails } = useSelector((state) => state.food);
  return (
    <DetailsDescStyled>
      <p>{foodDetails?.FoodDescription}</p>
    </DetailsDescStyled>
  );
};

export default DetailsDesc;
