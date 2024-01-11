/** @format */

import { Button } from "components/button";
import ModalComponent from "components/modal/ModalComponent";
import useModal from "hooks/useModal";
import React from "react";
import formatToDate from "utils/formatDate";
import priceVN from "utils/priceVN";
import selectState from "utils/selectState";
import UserRatingModal from "./UserRatingModal";
import PropTypes from "prop-types";

const RatingItem = ({ data }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  return (
    <tr>
      <td>{data.OrderID}</td>
      <td>{formatToDate(data.OrderDate)}</td>
      <td>{data.OrderPaymentMethod}</td>
      <td>
        <span className="block w-full px-2 py-1 font-medium text-center rounded bg-primary bg-opacity-10 text-primary">
          {selectState(data.OrderState)}
        </span>
      </td>
      <td>
        <span className="font-medium text-redPrimary">
          {priceVN(data.OrderSubTotal)}
        </span>
      </td>
      <td>
        <Button
          kind="primary"
          className="capitalize rounded"
          height="44px"
          onClick={openModal}
        >
          Đánh giá
        </Button>
        <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
          <UserRatingModal
            closeModal={closeModal}
            className="create-rating"
            orderId={data?.OrderID}
          ></UserRatingModal>
        </ModalComponent>
      </td>
    </tr>
  );
};

RatingItem.propTypes = {
  data: PropTypes.object,
};

export default RatingItem;
