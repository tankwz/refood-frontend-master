/** @format */

import Swal from "sweetalert2";
import styled from "styled-components";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { page, priceStatus, rationStatus, reviewStatus } from "utils/constants";
import { Input } from "components/input";
import { filterSearchFood } from "store/search/slice";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import { getAllTypesFood } from "store/food/slice";

const queryString = require("query-string");

const SearchDetailModalStyled = styled.div`
  width: 500px;
  overflow-y: hidden;
  .sd-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid ${(props) => props.theme.line};
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
  .sd-heading {
    font-size: 20px;
    font-weight: 500;
    color: ${(props) => props.theme.textPrimary};
  }
  .sd-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .sd-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .sd-drop {
    display: grid;
    grid-template-columns: auto auto;
    gap: 15px;
  }

  .sd-select {
    width: 100%;
    height: 44px;
    border: 1px solid ${(props) => props.theme.line};
    color: ${(props) => props.theme.textPrimary};
  }
  .sd-lists {
    height: 100px;
    overflow-y: scroll;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  .sd-option {
    font-size: 14px;
  }

  .sd-lists::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  .sd-lists::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${(props) => props.theme.textLight};
    border-radius: 10px;
  }

  /* Handle */
  .sd-lists::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.blueBold};
  }
`;

const listPrice = [
  {
    id: "1",
    name: "Dưới 100.000đ",
    value: priceStatus.UNDER100K,
  },
  {
    id: "2",
    name: "Từ 100.000đ đến 500.000đ",
    value: priceStatus.F100KT500K,
  },
  {
    id: "3",
    name: "Từ 500.000đ đến 1.000.000đ",
    value: priceStatus.F500KT1000K,
  },
  {
    id: "4",
    name: "Trên 1.000.000đ",
    value: priceStatus.ON1000K,
  },
];

const listRation = [
  {
    id: "1",
    name: "1 người",
    value: rationStatus.PERSON1,
  },
  {
    id: "2",
    name: "2 người",
    value: rationStatus.PERSON2,
  },
  {
    id: "3",
    name: "3 người",
    value: rationStatus.PERSON3,
  },
  {
    id: "4",
    name: "4 người",
    value: rationStatus.PERSON4,
  },
  {
    id: "5",
    name: "5 người",
    value: rationStatus.PERSON5,
  },
  {
    id: "6",
    name: "6 người",
    value: rationStatus.PERSON6,
  },
  {
    id: "7",
    name: "7 người",
    value: rationStatus.PERSON7,
  },
  {
    id: "8",
    name: "8 người",
    value: rationStatus.PERSON8,
  },
  {
    id: "9",
    name: "9 người",
    value: rationStatus.PERSON9,
  },
  {
    id: "10",
    name: "10 người",
    value: rationStatus.PERSON10,
  },
];

const listReview = [
  {
    id: "1",
    name: "1 sao",
    value: reviewStatus.VIEW1,
  },
  {
    id: "2",
    name: "2 sao",
    value: reviewStatus.VIEW2,
  },
  {
    id: "3",
    name: "3 sao",
    value: reviewStatus.VIEW3,
  },
  {
    id: "4",
    name: "4 sao",
    value: reviewStatus.VIEW4,
  },
  {
    id: "5",
    name: "5 sao",
    value: reviewStatus.VIEW5,
  },
];

const SearchDetailModal = ({ closeModal }) => {
  const [selectPrice, setSelectPrice] = useState("");
  const [selectRation, setSelectRation] = useState("");
  const [selectType, setSelectType] = useState("");
  const [selectReview, setSelectReview] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { typesFood } = useSelector((state) => state.food);
  useEffect(() => {
    function fetchAllTypesFood() {
      dispatch(getAllTypesFood());
    }
    fetchAllTypesFood();
  }, [dispatch]);

  const types = typesFood ? typesFood : [];

  const handleSubmitSearch = (values) => {
    if (!isValid) return null;
    if (values.name === "") {
      delete values.name;
    }
    const query = queryString.stringifyUrl({
      url: `${page.currentPage}/${page.countFood}/`,
      query: values,
    });

    const newObj = Object.assign({}, values, { page: page.currentPage });
    const p = queryString.stringify(newObj);

    try {
      Swal.fire({
        title: "Chờ giây lát!",
        icon: "info",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        dispatch(filterSearchFood(query));
        navigate(`/food/find-foods?${p}`);
      });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const location = useLocation();
  const parsed = queryString.parse(location.search);
  useEffect(() => {
    if (parsed?.name) {
      reset({ name: parsed.name });
    } else {
      reset({ name: "" });
    }
  }, []);

  return (
    <SearchDetailModalStyled>
      <div className="sd-top">
        <h3 className="sd-heading">Tìm kiếm nâng cao</h3>
        <div className="cursor-pointer text-text" onClick={closeModal}>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <form className="sd-form" onSubmit={handleSubmit(handleSubmitSearch)}>
        <div className="sd-name">
          <Input
            type="text"
            name="name"
            control={control}
            placeholder="Tìm món ăn"
          ></Input>
        </div>
        <div className="sd-drop">
          <Dropdown className="sd-dropdown">
            <Dropdown.Select
              placeholder={`${selectPrice}` || "Theo mức giá"}
              className="sd-select"
            ></Dropdown.Select>
            <Dropdown.List className="sd-lists">
              {listPrice.length > 0 &&
                listPrice.map((price) => (
                  <Dropdown.Option
                    key={price.name}
                    className="sd-option"
                    onClick={() => {
                      setSelectPrice(price.name);
                      setValue("prices", price.value);
                    }}
                  >
                    {price.name}
                  </Dropdown.Option>
                ))}
            </Dropdown.List>
          </Dropdown>

          <Dropdown className="sd-dropdown">
            <Dropdown.Select
              placeholder={`${selectType}` || "Theo loại"}
              className="sd-select"
            ></Dropdown.Select>
            <Dropdown.List className="sd-lists">
              {types.length > 0 &&
                types.map((type) => (
                  <Dropdown.Option
                    key={type.FoodTypeId}
                    className="sd-option"
                    onClick={() => {
                      setSelectType(type.FoodTypeName);
                      setValue("type", type.FoodTypeName);
                    }}
                  >
                    {type.FoodTypeName}
                  </Dropdown.Option>
                ))}
            </Dropdown.List>
          </Dropdown>

          <Dropdown className="sd-dropdown">
            <Dropdown.Select
              placeholder={`${selectRation}` || "Theo khẩu phần"}
              className="sd-select"
            ></Dropdown.Select>
            <Dropdown.List className="sd-lists">
              {listRation.length > 0 &&
                listRation.map((ration) => (
                  <Dropdown.Option
                    key={ration.name}
                    className="sd-option"
                    onClick={() => {
                      setSelectRation(ration.name);
                      setValue("ration", ration.value);
                    }}
                  >
                    {ration.name}
                  </Dropdown.Option>
                ))}
            </Dropdown.List>
          </Dropdown>

          <Dropdown className="sd-dropdown">
            <Dropdown.Select
              placeholder={`${selectReview}` || "Theo đánh giá"}
              className="sd-select"
            ></Dropdown.Select>
            <Dropdown.List className="sd-lists">
              {listReview.length > 0 &&
                listReview.map((view) => (
                  <Dropdown.Option
                    key={view.name}
                    className="sd-option"
                    onClick={() => {
                      setSelectReview(view.name);
                      setValue("review", view.value);
                    }}
                  >
                    {view.name}
                  </Dropdown.Option>
                ))}
            </Dropdown.List>
          </Dropdown>
        </div>
        <div className="flex justify-end mt-8">
          <Button
            type="submit"
            kind="primary"
            height="44px"
            className="w-full max-w-[120px]"
          >
            Tìm kiếm
          </Button>
        </div>
      </form>
    </SearchDetailModalStyled>
  );
};

SearchDetailModal.propTypes = {
  closeModal: PropTypes.func,
};

export default SearchDetailModal;
