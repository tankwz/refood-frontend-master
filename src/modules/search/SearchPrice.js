/** @format */

import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import priceVN from "utils/priceVN";
import { useState } from "react";
import { useEffect } from "react";

const SearchPriceStyled = styled.div`
  .range-input {
    position: relative;
  }
  input[type="range"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    outline: none;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    background-color: transparent;
    pointer-events: none;
  }
  .slide-track {
    width: 100%;
    height: 5px;
    border-radius: 6px;
    background-color: ${(props) => props.theme.textLight};
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 5px;
  }
  input[type="range"]::-moz-range-track {
    -moz-appearance: none;
    height: 5px;
  }
  input[type="range"]::-ms-track {
    appearance: none;
    height: 5px;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1em;
    width: 1em;
    background-color: ${(props) => props.theme.primary};
    cursor: pointer;
    border-radius: 100%;
    pointer-events: auto;
    margin-top: -6px;
  }
  input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;
    height: 1em;
    width: 1em;
    background-color: ${(props) => props.theme.primary};
    cursor: pointer;
    border-radius: 50%;
    pointer-events: auto;
  }
  input[type="range"]::-ms-thumb {
    appearance: none;
    height: 1em;
    width: 1em;
    cursor: pointer;
    border-radius: 50%;
    background-color: ${(props) => props.theme.primary};
    pointer-events: auto;
  }
  input[type="range"]:active::-webkit-slider-thumb {
    background-color: #fff;
    border: 2px solid ${(props) => props.theme.primary};
  }
  .range-value {
    background-color: ${(props) => props.theme.primary};
    color: #fff;
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    padding: 10px 0;
    border-radius: 6px;
    text-align: center;
    font-size: 16px;
  }
  .values {
    position: relative;
  }
  .range-value::before {
    content: "";
    position: absolute;
    border-top: 15px solid ${(props) => props.theme.primary};
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    margin: auto;
    bottom: -14px;
    height: 0;
    width: 0;
    left: 0;
    right: 0;
  }
`;

const SearchPrice = ({ setPriceSelect }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000000);

  const handleMinValue = (e) => {
    setMinValue(e.target.value);
  };

  const handleMaxValue = (e) => {
    setMaxValue(e.target.value);
  };

  useEffect(() => {
    function updatePrice() {
      let result = [];
      const price = `${minValue}-${maxValue}`;
      result.push({ prices: price });
      setPriceSelect(result);
    }
    updatePrice();
  }, [minValue, maxValue, setPriceSelect]);
  return (
    <SearchPriceStyled>
      <label>Theo mức giá</label>
      <div className="values">
        <div className="mt-5 mb-7 range-value">
          <span id="value-min">{priceVN(minValue)}</span>
          <span> - </span>
          <span id="value-max">{priceVN(maxValue)}</span>
        </div>
      </div>
      <div className="range-input">
        <div className="slide-track"></div>
        <input
          type="range"
          min={0}
          max={1000000}
          className="slide-1"
          value={minValue}
          onChange={handleMinValue}
        />
        <input
          type="range"
          min={0}
          max={1000000}
          className="slide-2"
          value={maxValue}
          onChange={handleMaxValue}
        />
      </div>
    </SearchPriceStyled>
  );
};

SearchPrice.propTypes = {
  setPriceSelect: PropTypes.func,
};

export default SearchPrice;
