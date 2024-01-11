/** @format */

const { useState, createContext, useContext } = require("react");

const ModalContext = createContext();

function ModalProvider(props) {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const values = { showModal, setShowModal, handleShowModal };
  return (
    <ModalContext.Provider value={values}>
      {props.children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);
  if (typeof context === "undefined")
    throw new Error("useModal must be used within ModalProvider");
  return context;
}
export { ModalProvider, useModal };
