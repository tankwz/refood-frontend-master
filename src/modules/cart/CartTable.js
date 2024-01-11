/** @format */

import useGetCount from "hooks/useGetCount";
import Swal from "sweetalert2";
import React from "react";
import PropTypes from "prop-types";
import ProductTitle from "modules/products/ProductTitle";
import ProductPrice from "modules/products/ProductPrice";
import ProductImage from "modules/products/ProductImage";
import priceVN from "utils/priceVN";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Quantity } from "components/quantity";
import { deleteCart, updateCartItem } from "store/cart/slice";

const CartTable = ({ data }) => {
  const [subTotal, setSubTotal] = useState(0);
  const { getCount, handleSetGetCount } = useGetCount();
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCount >= 1) {
      setSubTotal(getCount * data.FoodPrice);
    }
  }, [getCount, data.FoodPrice]);

  // Update cart
  useEffect(() => {
    function updateCart() {
      if (data.FoodDishCount !== getCount)
        dispatch(
          updateCartItem({
            mactma: data.FoodDetailID,
            count: getCount,
          })
        );
    }
    updateCart();
  }, [getCount, data.FoodDishCount, dispatch, data.FoodDetailID]);
  // Delete cart item
  const handleDeleteCartItem = () => {
    try {
      Swal.fire({
        title: "Xóa món ăn?",
        text: `Bạn muốn xóa món ${data.FoodName}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1dc071",
        cancelButtonColor: "#ea2b0f",
        confirmButtonText: "Xóa",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCart({ mactma: data.FoodDetailID }));
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (!data) return null;
  return (
    <>
      <tr>
        <td className="cl-thumb ">
          <div className="cl-image">
            <ProductImage url={data.FoodThumb}></ProductImage>
          </div>
        </td>
        <td className="cl-name">
          <ProductTitle>
            {/* {data.length > 10
              ? 
              : data.FoodName} */}
            {data.FoodName.slice(0, 15) + "..."}
          </ProductTitle>
        </td>
        <td className="cl-price">
          <ProductPrice>{priceVN(data.FoodPrice)}</ProductPrice>
        </td>
        <td className="cl-ration">
          <div className="px-4 py-2 text-sm font-medium text-center border rounded-md text-primary bg-bgPrimary border-primary">
            {data.FoodRation} người
          </div>
        </td>
        <td className="cl-quantity">
          <Quantity
            currentCount={data.FoodDishCount}
            name="count"
            handleSetGetCount={handleSetGetCount}
          >
            {" "}
          </Quantity>
        </td>
        <td className="cl-subtotal">
          <ProductPrice>{priceVN(subTotal)}</ProductPrice>
        </td>
        <td onClick={handleDeleteCartItem}>
          <span className="flex justify-center pb-1 cursor-pointer hover:text-redPrimary text-text">
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
          </span>
        </td>
      </tr>
    </>
  );
};

CartTable.propTypes = {
  data: PropTypes.object,
};

export default CartTable;
