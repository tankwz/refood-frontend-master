/** @format */

import { Button } from "components/button";
import { Radio } from "components/checkbox";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Swal from "sweetalert2";
import { addressStatus } from "utils/constants";

const OrderSelectAddressStyled = styled.div`
  overflow-y: hidden;
  .osa-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid ${(props) => props.theme.line};
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
  .osa-heading {
    font-size: 20px;
    font-weight: 500;
    color: ${(props) => props.theme.textPrimary};
  }
  .address-main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px 10px;
    border-bottom: 1px solid ${(props) => props.theme.line};
    cursor: pointer;
  }

  .address-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .address-user {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
  }
  .address-name,
  .address-text,
  .address-update {
    font-size: 14px;
    color: ${(props) => props.theme.textPrimary};
    font-weight: 500;
  }
  .address-text {
    color: ${(props) => props.theme.textGray};
    font-weight: 400;
  }
  .address-update {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    cursor: pointer;
    color: ${(props) => props.theme.blueBold};
  }
  .address-desc {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .address-direction {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .address-set {
    padding: 5px 10px;
    border: 1px solid ${(props) => props.theme.line};
    font-size: 14px;
    color: ${(props) => props.theme.text};
    border-radius: 3px;
  }
  .address-set:hover {
    border: 1px solid ${(props) => props.theme.textGray};
    color: ${(props) => props.theme.textGray};
    transition: all 0.3s linear;
  }
  .address-default {
    display: flex;
    justify-content: flex-start;
    padding: 3px 10px;
    border: 1px solid ${(props) => props.theme.red};
    color: ${(props) => props.theme.red};
    font-size: 14px;
    pointer-events: none;
  }
`;

const OrderSelectAddress = ({
  closeModal,
  addresses,
  setAddressOrder,
  addressOrder,
}) => {
  const { control } = useForm({
    mode: "onChange",
  });
  const [checked, setChecked] = useState("");
  const [selectAddress, setSelectAddress] = useState({});
  useEffect(() => {
    if (addressOrder) {
      setChecked(addressOrder.AddressId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressOrder]);

  const handleSelectAddress = (address) => {
    setChecked(address?.AddressId);
    setSelectAddress(address);
  };

  const handleComfirmSelectAddress = () => {
    Swal.fire({
      title: "Chờ giây lát!",
      icon: "info",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      setAddressOrder(selectAddress);
      closeModal();
    });
  };

  return (
    <>
      <OrderSelectAddressStyled className="lg:w-[500px] w-[300px]">
        <div className="osa-top">
          <h3 className="osa-heading">Chọn địa chỉ khác</h3>
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
        <div className="h-[300px] overflow-y-auto scroll">
          {addresses?.length > 0 &&
            addresses?.map((address) => (
              <div
                className="address-main"
                key={address?.AddressId}
                onClick={() => handleSelectAddress(address)}
              >
                <div className="address-info">
                  <div className="address-user">
                    <div className="address-name">
                      {address?.AddressRecieverName}
                    </div>
                    <div className="text-line">|</div>
                    <div className="address-text">
                      {address?.AddressRecieverPhone}
                    </div>
                  </div>
                  <div className="address-check">
                    <Radio
                      control={control}
                      name="isDefaultAddress"
                      checked={checked === address?.AddressId}
                    ></Radio>
                  </div>
                </div>
                <div className="address-desc">
                  <div className="address-direction">
                    <span className="address-text">
                      {address?.AddressNumAndStreetName}
                    </span>
                    <span className="address-text">
                      {address?.AddressWard}, {address?.AddressDistrict}, Cần
                      Thơ
                    </span>
                  </div>
                </div>
                {address?.isDefaultAddress === addressStatus.DEFAULT && (
                  <div>
                    <button className="address-default">Mặc định</button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </OrderSelectAddressStyled>
      <div className="flex justify-end mt-3">
        <Button
          type="submit"
          kind="primary"
          height="44px"
          className="w-full max-w-[150px]"
          onClick={handleComfirmSelectAddress}
        >
          Xác nhận
        </Button>
      </div>
    </>
  );
};

export default OrderSelectAddress;
