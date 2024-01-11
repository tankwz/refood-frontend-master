/** @format */

import { Button } from "components/button";
import { useCart } from "contexts/cart-context";
import ProductPrice from "modules/products/ProductPrice";
import React from "react";
import { feeDelivery } from "utils/constants";
import priceVN from "utils/priceVN";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createOrderFood, getVNPAYOrder, initOrder } from "store/order/slice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getCartDetail } from "store/cart/slice";

const OrderTotal = ({ note, addressId, pay }) => {
  const [values, setValues] = useState({});
  const [total] = useCart();

  useEffect(() => {
    setValues({ addressid: addressId, ordernote: note, paymentmethod: pay });
  }, [note, addressId, pay, setValues]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderInfo, message, url } = useSelector((state) => state.order);

  const handleClickOrder = () => {
    if (pay) {
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
          dispatch(createOrderFood(values));
          dispatch(getCartDetail());
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Bạn chưa chọn hình thức thanh toán", {
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    if (orderInfo && orderInfo?.OrderPaymentMethod !== "vnpay") {
      console.log("useEffect ~ orderInfo", orderInfo);
      Swal.fire({
        title: message,
        icon: "success",
        showCancelButton: true,
        cancelButtonColor: "#6F49FD",
        confirmButtonColor: "#1dc071",
        confirmButtonText: "Xem đơn hàng",
        cancelButtonText: "Trang chủ",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/user/order");
          dispatch(initOrder());
        } else {
          navigate("/");
          dispatch(initOrder());
        }
      });
    } else if (orderInfo && orderInfo?.OrderPaymentMethod === "vnpay") {
      dispatch(getVNPAYOrder(orderInfo.OrderID));
    }
  }, [dispatch, message, navigate, orderInfo]);

  useEffect(() => {
    if (url) {
      window.location = url;
    }
  }, [url]);
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-bold text-text">Chi tiết thanh toán</h3>
      <div className="flex items-center justify-between">
        <span className="text-text1">Tổng đơn hàng:</span>
        <ProductPrice>{priceVN(total)}</ProductPrice>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-text1">Phí giao hàng:</span>
        <ProductPrice>{priceVN(feeDelivery.fee)}</ProductPrice>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-text1">Tổng thanh toán:</span>
        <ProductPrice>{priceVN(feeDelivery.fee + total)}</ProductPrice>
      </div>
      <div className="mt-5">
        <Button
          height="44px"
          className="w-full"
          type="submit"
          onClick={handleClickOrder}
        >
          Đặt hàng
        </Button>
      </div>
    </div>
  );
};

OrderTotal.propTypes = {
  note: PropTypes.string,
  addressId: PropTypes.string,
  pay: PropTypes.string,
};

export default OrderTotal;
