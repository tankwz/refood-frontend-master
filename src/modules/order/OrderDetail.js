/** @format */

import Swal from "sweetalert2";
import StepProcessBar from "components/stepprocessbar/StepProcessBar";
import selectState from "utils/selectState";
import React from "react";
import queryString from "query-string";
import ProductPrice from "modules/products/ProductPrice";
import priceVN from "utils/priceVN";
import OrderDetailItem from "./OrderDetailItem";
import formatToDate from "../../utils/formatDate";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrderDetail,
  getInvoiceId,
  getOrderDetail,
} from "store/order/slice";
import { Button } from "components/button";
import ModalComponent from "components/modal/ModalComponent";
import useModal from "hooks/useModal";
import OrderInvoiceDetail from "./OrderInvoiceDetail";

const OrderDetail = () => {
  const location = useLocation();
  const value = queryString.parse(location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    function fetchOrderDetail() {
      dispatch(getOrderDetail(value.id));
    }
    fetchOrderDetail();
  }, [dispatch, value.id]);

  const { orderDetail, invoiceid } = useSelector((state) => state.order);
  const data = orderDetail?.OrderDetails ? orderDetail?.OrderDetails : [];
  const { modalIsOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    function fetchInvoiceId() {
      if (orderDetail) {
        dispatch(getInvoiceId(orderDetail?.OrderID));
      }
    }
    fetchInvoiceId();
  }, [dispatch, orderDetail]);

  useEffect(() => {
    if (value.paid === "vnpay") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Đã thanh toán bằng VNPay",
        showConfirmButton: false,
        timer: 1500,
      });
      openModal();
    }
  }, [value.paid]);

  const handleDeleteOrderDetail = () => {
    try {
      Swal.fire({
        title: "Bạn muốn hủy đơn hàng?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hủy đơn",
        confirmButtonColor: "#1DC071",
        cancelButtonText: "Thoát",
        cancelButtonColor: "#EB5757",
      }).then(async (result) => {
        if (result.isConfirmed) {
          dispatch(deleteOrderDetail(orderDetail?.OrderID));
          navigate("/user/order");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-between py-2 mb-4 border-b lg:mb-10 md:mb-10 border-b-line"
        onClick={() => {
          navigate("/user/order/");
        }}
      >
        <div className="flex cursor-pointer text-text1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-base font-medium text-center uppercase text-text1">
            Trở lại
          </span>
        </div>
        <div className="items-center justify-end hidden gap-3 text-base font-normal uppercase lg:flex md:flex">
          <span className="text-text1">
            Ngày đặt: {formatToDate(orderDetail?.OrderDate)}
          </span>
          <span>|</span>
          <span className="text-text1">
            ID Đơn hàng: {orderDetail?.OrderID}
          </span>
          <span>|</span>
          <span className="text-redPrimary">
            {selectState(orderDetail?.OrderState)}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-start gap-1 text-xs font-normal uppercase lg:hidden md:hidden">
        <span className="text-text">
          Ngày đặt: {formatToDate(orderDetail?.OrderDate)}
        </span>
        <span>|</span>
        <span className="text-text">ID Đơn hàng: {orderDetail?.OrderID}</span>
        <span>|</span>
        <span className="text-redPrimary">
          {selectState(orderDetail?.OrderState)}
        </span>
      </div>
      <div className="relative hidden lg:block md:block">
        <StepProcessBar
          orderState={orderDetail?.OrderState ? orderDetail?.OrderState : 0}
        ></StepProcessBar>
      </div>
      <div className="mt-5 border-b lg:mt-10 md:mt-10 border-b-line">
        <h3 className="mb-2 text-lg font-medium b-4 text-text">Địa chỉ</h3>
        <div className="flex flex-col gap-1 text-sm ">
          <span className="p-2 text-text1 bg-bgPrimary">
            {orderDetail?.OrderAdress}
          </span>
        </div>
      </div>
      <div className="mt-5 border-b lg:mt-10 md:mt-10 border-b-line">
        <h3 className="mb-2 text-lg font-medium b-4 text-text">Ghi chú</h3>
        <div className="flex flex-col gap-1 text-sm ">
          <span className="p-2 text-text1 bg-bgPrimary">
            {orderDetail?.OrderNote
              ? orderDetail?.OrderNote
              : "Không có ghi chú"}
          </span>
        </div>
      </div>
      <h3 className="mt-4 mb-4 text-lg font-medium text-text">
        Danh sách món ăn
      </h3>
      <div className="flex flex-col gap-4">
        <OrderDetailItem
          data={data}
          orderState={orderDetail?.OrderState}
        ></OrderDetailItem>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
        <div className="flex items-start justify-end gap-3 lg:items-center md:items-center">
          <span className="text-base font-medium lg:text-lg md:text-lg text-text">
            Phương thức thanh toán:
          </span>
          <span className="text-xs lg:text-base md:text-base text-text1">
            {orderDetail?.OrderPaymentMethod}
          </span>
        </div>
        <div className="flex items-center justify-end gap-3">
          <span className="text-lg font-medium text-text">Tổng tiền:</span>
          <ProductPrice sizeText="20px">
            {priceVN(orderDetail?.OrderSubTotal)}
          </ProductPrice>
        </div>
      </div>
      {orderDetail?.OrderState === 0 && (
        <div className="flex justify-end py-4">
          <Button
            className="w-[140px]"
            height="44px"
            kind="primary"
            onClick={handleDeleteOrderDetail}
          >
            Hủy đơn
          </Button>
        </div>
      )}
      <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
        <OrderInvoiceDetail
          closeModal={closeModal}
          invoiceid={invoiceid}
        ></OrderInvoiceDetail>
      </ModalComponent>
    </>
  );
};

export default OrderDetail;
