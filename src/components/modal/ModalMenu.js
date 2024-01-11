/** @format */

import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

const customStyles = {
  content: {
    top: "0px",
    left: "0px",
    right: "auto",
    bottom: "0px",
    width: "300px",
    transition: "all 0.3s linear",
    overflowX: "hidden",
  },
};

Modal.setAppElement("#root");

const ModalMenu = ({
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
      >
        {children}
      </Modal>
    </>
  );
};

ModalMenu.propTypes = {
  children: PropTypes.any,
  modalIsOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  className: PropTypes.string,
};

export default ModalMenu;
