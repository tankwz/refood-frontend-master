/** @format */

import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    transition: "all 0.3s linear",
    overflowY: "hidden",
  },
};

Modal.setAppElement("#root");

const ModalComponent = ({
  children,
  modalIsOpen,
  closeModal = () => {},
  className = "",
}) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className={className}
        overlayClassName="overlay"
        bodyOpenClassName="overflow"
      >
        {children}
      </Modal>
    </>
  );
};

ModalComponent.propTypes = {
  children: PropTypes.any,
  modalIsOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  className: PropTypes.string,
};

export default ModalComponent;
