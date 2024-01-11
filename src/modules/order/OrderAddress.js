/** @format */
import ModalComponent from "components/modal/ModalComponent";
import useModal from "hooks/useModal";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authGetAllAddress } from "store/auth/slice";
import styled from "styled-components";
import OrderSelectAddress from "./OrderSelectAddress";
import PropTypes from "prop-types";

const OrderAddressStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${(props) => props.theme.line};
  .oad-heading {
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.textPrimary};
  }
  .oad-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .oad-content {
    font-size: 16px;
    color: ${(props) => props.theme.text3};
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .oad-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }
`;

const OrderAddress = ({ setAddressId }) => {
  const [addressOrder, setAddressOrder] = useState({});
  const { user, addresses } = useSelector((state) => state.auth);
  const { modalIsOpen, openModal, closeModal } = useModal();

  const dispatch = useDispatch();
  // Get all address
  useEffect(() => {
    function getAllAddress() {
      try {
        dispatch(authGetAllAddress());
      } catch (error) {
        console.log(error);
      }
    }
    getAllAddress();
  }, [dispatch]);

  useEffect(() => {
    if (addresses) {
      addresses.forEach((item) => {
        if (item.isDefaultAddress === 1) {
          setAddressOrder(item);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  // Get address id for order
  useEffect(() => {
    if (addressOrder) {
      setAddressId(addressOrder.AddressId);
    }
  }, [addressOrder, setAddressId]);

  return (
    <OrderAddressStyled>
      <h3 className="oad-heading">Địa chỉ nhận hàng</h3>
      <div className="oad-main">
        <div className="oad-content">
          <span>
            {user?.CustomerName} - {user?.CustomerPhone}
          </span>
          <span>
            {addressOrder?.AddressNumAndStreetName + ","}{" "}
            {addressOrder?.AddressWard + ","}{" "}
            {addressOrder?.AddressDistrict + ","} Tp Cần Thơ
          </span>
        </div>
        <div className="oad-btn">
          {addressOrder?.isDefaultAddress === 1 && (
            <div className="px-2 py-1 text-sm bg-white border rounded-sm cursor-default text-redPrimary border-redPrimary">
              Mặc định
            </div>
          )}
          <div
            className="text-sm font-medium cursor-pointer text-blueBold hover:text-redPrimary"
            onClick={openModal}
          >
            Thay đổi
          </div>
          <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
            <OrderSelectAddress
              closeModal={closeModal}
              addresses={addresses}
              setAddressOrder={setAddressOrder}
              addressOrder={addressOrder}
            ></OrderSelectAddress>
          </ModalComponent>
        </div>
      </div>
    </OrderAddressStyled>
  );
};

OrderAddress.propTypes = {
  setAddressId: PropTypes.func,
};

export default React.memo(OrderAddress);
