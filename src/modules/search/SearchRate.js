/** @format */

import Swal from "sweetalert2";
import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";

const SearchRateStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .rate-main {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
  }
  .rate-item {
    padding: 5px 8px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.primary};
    font-size: 12px;
    text-transform: capitalize;
    background-color: ${(props) => props.theme.lightBlue};
    color: ${(props) => props.theme.primary};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchRate = ({ setRateSelect }) => {
  const [rates, setRates] = useState([
    { id: 1, checked: false, label: "1" },
    {
      id: 2,
      checked: false,
      label: "2",
    },
    {
      id: 3,
      checked: false,
      label: "3",
    },
    { id: 4, checked: false, label: "4" },
    { id: 5, checked: false, label: "5" },
  ]);

  const handleClickRate = (id) => {
    const listRates = rates;
    const chageCheckedRate = listRates.map((item) => {
      return item.id === id
        ? { ...item, checked: !item.checked }
        : { ...item, checked: false };
    });
    Swal.fire({
      title: "Chờ giây lát!",
      icon: "info",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      setRates(chageCheckedRate);
      document.body.scrollIntoView({ behavior: "smooth" });
    });
  };

  useEffect(() => {
    function updateType() {
      let result = [];
      rates.filter((t) => t.checked && result.push({ review: t.label }));
      setRateSelect(result);
    }
    updateType();
  }, [rates]);

  return (
    <SearchRateStyled>
      <label>Theo đánh giá</label>
      <div className="rate-main">
        {rates.map((rate) => (
          <div
            className="rate-item"
            key={rate.id}
            onClick={() => handleClickRate(rate.id)}
          >
            {rate.label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ffcd00"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ))}
      </div>
    </SearchRateStyled>
  );
};

SearchRate.propTypes = {
  setRateSelect: PropTypes.func,
};

export default SearchRate;
