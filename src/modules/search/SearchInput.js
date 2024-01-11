/** @format */

import useModal from "hooks/useModal";
import Swal from "sweetalert2";
import styled from "styled-components";
import SearchDetailModal from "./SearchDetailModal";
import React from "react";
import PropTypes from "prop-types";
import ModalComponent from "components/modal/ModalComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Input } from "components/input";
import { filterSearchFood } from "store/search/slice";
import { page } from "utils/constants";
const queryString = require("query-string");

const SearchInputStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 550px;
  .search-main {
    display: flex;
    align-items: center;
    position: relative;
  }
  .search-input {
    flex: 1;
    font-weight: 400;
    border-radius: 8px;
    color: ${(props) => props.theme.text};
    background-color: #f3f4f7;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    font-weight: 500;
    color: ${(props) => props.theme.textPrimary};
    cursor: pointer;
  }
  .search-icon:hover {
    color: ${(props) => props.theme.primary};
    transition: all 0.3s linear;
  }
`;

const SearchInput = ({ className = "" }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const { control, getValues, reset } = useForm({
    mode: "onChange",
  });
  //
  // Handle Click Search
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickSearch = () => {
    const query = queryString.stringify(getValues(), {
      skipNull: true,
    });
    console.log("query ~ query", query);
    Swal.fire({
      title: "Chờ giây lát!",
      icon: "info",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      dispatch(
        filterSearchFood(`${page.currentPage}/${page.countFood}${query}`)
      );
      navigate(`/food/find-foods?${query}`);
    });
  };

  const location = useLocation();
  const parsed = queryString.parse(location.search);

  useEffect(() => {
    reset(parsed);
  }, []);

  return (
    <SearchInputStyled className={className}>
      <form className="search-main">
        <Input
          type="text"
          className="search-input"
          placeholder="Tìm món ăn..."
          control={control}
          name="name"
        />
        <span className="search-icon" onClick={handleClickSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
      </form>
      <div className="flex justify-end text-xs transition-all text-text ">
        <span onClick={openModal} className="cursor-pointer hover:text-primary">
          Tìm kiếm nâng cao
        </span>
      </div>
      <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
        <SearchDetailModal closeModal={closeModal}></SearchDetailModal>
      </ModalComponent>
    </SearchInputStyled>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
};

export default SearchInput;
