/** @format */

import Swal from "sweetalert2";
import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";

const SearchRationStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .ration-main {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
  }
  .ration-item {
    padding: 5px 8px;
    border-radius: 6px;
    border: 1px solid ${(props) => props.theme.primary};
    font-size: 12px;
    text-transform: capitalize;
    background-color: ${(props) => props.theme.lightBlue};
    color: ${(props) => props.theme.primary};
    cursor: pointer;
  }
`;

const SearchRation = ({ setRationSelect }) => {
  const [rations, setRations] = useState([
    { id: 1, checked: false, label: 1 },
    {
      id: 2,
      checked: false,
      label: 2,
    },
    {
      id: 3,
      checked: false,
      label: 3,
    },
    { id: 4, checked: false, label: 4 },
    { id: 5, checked: false, label: 5 },
    { id: 6, checked: false, label: 6 },
    { id: 7, checked: false, label: 7 },
    { id: 8, checked: false, label: 8 },
    { id: 9, checked: false, label: 9 },
    { id: 10, checked: false, label: 10 },
  ]);

  const handleRation = (id) => {
    const listRations = rations;
    const chageCheckedRation = listRations.map((item) => {
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
      setRations(chageCheckedRation);
      document.body.scrollIntoView({ behavior: "smooth" });
    });
  };

  useEffect(() => {
    function updateType() {
      let result = [];
      rations.filter((t) => t.checked && result.push({ ration: t.label }));
      setRationSelect(result);
    }
    updateType();
  }, [rations]);

  return (
    <SearchRationStyled>
      <label>Theo khẩu phần</label>
      <div className="ration-main">
        {rations.map((ration) => (
          <div
            className="ration-item"
            key={ration.id}
            onClick={() => handleRation(ration.id)}
          >
            {ration.label} người
          </div>
        ))}
      </div>
    </SearchRationStyled>
  );
};

SearchRation.propTypes = {
  setRationSelect: PropTypes.func,
};

export default SearchRation;
