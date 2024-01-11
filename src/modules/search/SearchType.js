/** @format */

import Swal from "sweetalert2";
import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Checkbox } from "components/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypesFood } from "store/food/slice";

const SearchType = ({ setTypeSelect }) => {
  const { control } = useForm({
    mode: "onChange",
  });
  const [types, setTypes] = useState([]);

  const { typesFood } = useSelector((state) => state.food);
  const dispatch = useDispatch();
  useEffect(() => {
    function fetchAllTypesFood() {
      dispatch(getAllTypesFood());
    }
    fetchAllTypesFood();
  }, [dispatch]);

  useEffect(() => {
    if (typesFood) {
      const result = typesFood.map((item) => {
        const objItem = Object.assign({ ...item }, { checked: false });
        return objItem;
      });
      setTypes(result);
    }
  }, [typesFood]);

  const handleCheckedType = (id) => {
    const listTypes = [...types];
    const chageCheckedType = listTypes.map((item) => {
      return item.FoodTypeId === id
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
      setTypes(chageCheckedType);
      document.body.scrollIntoView({ behavior: "smooth" });
    });
  };

  // Update type
  useEffect(() => {
    function updateType() {
      let result = [];
      if (types.length > 0) {
        types.filter((t) => {
          return t.checked && result.push({ type: t.FoodTypeName });
        });
        setTypeSelect(result);
      }
    }
    updateType();
  }, [setTypeSelect, types]);
  return (
    <>
      <label>Theo loại món ăn</label>
      {types.map((item, index) => {
        return (
          index < types.length - 1 && (
            <Checkbox
              control={control}
              name="type"
              key={item.FoodTypeId}
              checked={item.checked}
              onClick={() => handleCheckedType(item.FoodTypeId)}
            >
              {item.FoodTypeName}
            </Checkbox>
          )
        );
      })}
    </>
  );
};

SearchType.propTypes = {
  setTypeSelect: PropTypes.func,
};

export default SearchType;
