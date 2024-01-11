/** @format */

import SearchFilter from "modules/search/SearchFilter";
import React from "react";
import styled from "styled-components";

const SearchLeftStyled = styled.div``;

const ProductLeft = () => {
  return (
    <SearchLeftStyled>
      <SearchFilter></SearchFilter>
    </SearchLeftStyled>
  );
};

export default ProductLeft;
