/** @format */

import { useState } from "react";

export default function useModal() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    modalIsOpen,
    openModal,
    closeModal,
  };
}
