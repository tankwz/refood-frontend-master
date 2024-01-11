/** @format */

import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";

const QuantityStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  .quantity-number {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    input {
      width: 30px;
      height: 32px;
      text-align: center;
    }
  }
  .btn-minus,
  .btn-plus {
    cursor: pointer;
    padding: 6px 6px;
    background-color: ${(props) => props.theme.borderLight};
    border-radius: 100%;
  }
  .btn-minus:hover,
  .btn-plus:hover {
    background-color: ${(props) => props.theme.primary};
    color: #fff;
  }
`;

const Quantity = ({ name = "", handleSetGetCount, currentCount = 1 }) => {
  const [count, setCount] = useState(1);
  const handleIncrement = () => {
    setCount((count) => count + 1);
  };
  const handleDecrement = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
  };

  useEffect(() => {
    handleSetGetCount(count);
  }, [count]);

  useEffect(() => {
    if (currentCount > 1) {
      setCount(currentCount);
    }
  }, [currentCount]);
  return (
    <QuantityStyled>
      <div className="quantity-number">
        <div
          className={
            count === 1
              ? "btn-minus text-[#9b9bb4]"
              : "btn-minus text-[#202435]"
          }
          onClick={handleDecrement}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15"
            />
          </svg>
        </div>
        <input
          type="text"
          name={name}
          id={name}
          className="input-quantity"
          step={1}
          value={count}
          min={1}
          max={64}
          inputMode="numeric"
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <div className="btn-plus text-[#202435]" onClick={handleIncrement}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
    </QuantityStyled>
  );
};

Quantity.propTypes = {
  name: PropTypes.string,
  handleSetGetCount: PropTypes.func,
  currentCount: PropTypes.number,
};

export default Quantity;
