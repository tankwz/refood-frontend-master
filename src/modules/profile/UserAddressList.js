/** @format */

import UserUpdateAddress from "./UserUpdateAddress";
import useNotification from "hooks/useNotification";
import useModal from "hooks/useModal";
import Swal from "sweetalert2";
import React from "react";
import PropTypes from "prop-types";
import ModalComponent from "components/modal/ModalComponent";
import { useDispatch } from "react-redux";
import { deleteAddressApi } from "api/user";
import { authGetAddressDetail, authGetAllAddress } from "store/auth/slice";
import { addressStatus } from "utils/constants";

const UserAddressList = ({ addresses }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const { notifySuccess, notifyError } = useNotification();

  // Open Modal Update Address And Get Address Detail
  const handleGetAddressDetail = (addressId) => {
    openModal();
    dispatch(authGetAddressDetail(addressId));
  };

  // Delete Address
  const handleDeleteAddress = async (addressId) => {
    try {
      Swal.fire({
        title: "Bạn muốn xóa địa chỉ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        confirmButtonColor: "#1dc071",
        cancelButtonText: "Hủy",
        cancelButtonColor: "#ea2b0f",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteAddressApi(addressId);
          if (response.status === 200) {
            notifySuccess(response.data.message);
            dispatch(authGetAllAddress());
          }
        }
      });
    } catch (error) {
      const { message } = error.response.data;
      notifyError(message);
    }
  };

  return (
    <>
      {addresses?.length > 0 ? (
        <div>
          {addresses?.map((address) => (
            <div className="address-main" key={address?.AddressId}>
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
                <div className="address-update">
                  {address?.isDefaultAddress === addressStatus.NOT_DEFAULT && (
                    <>
                      <span
                        className="hover:text-redPrimary"
                        onClick={() => handleDeleteAddress(address?.AddressId)}
                      >
                        Xóa
                      </span>

                      <span
                        className="hover:text-redPrimary"
                        onClick={() =>
                          handleGetAddressDetail(address?.AddressId)
                        }
                      >
                        Cập nhật
                      </span>
                    </>
                  )}
                  <ModalComponent
                    modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                  >
                    <UserUpdateAddress
                      closeModal={closeModal}
                      className="lg:w-[500px] lg:overflow-y-hidden"
                    ></UserUpdateAddress>
                  </ModalComponent>
                </div>
              </div>
              <div className="address-desc">
                <div className="address-direction">
                  <span className="address-text">
                    {address?.AddressNumAndStreetName}
                  </span>
                  <span className="address-text">
                    {address?.AddressWard}, {address?.AddressDistrict}, Cần Thơ
                  </span>
                </div>
                {/* <button className="address-set">Thiết lặp mặc định</button> */}
              </div>
              {address?.isDefaultAddress === addressStatus.DEFAULT && (
                <div>
                  <button className="address-default">Mặc định</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <span>Thêm địa chỉ mới</span>
      )}
    </>
  );
};

UserAddressList.propTypes = {
  addresses: PropTypes.array,
};

export default UserAddressList;
