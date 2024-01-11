/** @format */

const { useContext } = require("react");
const { useState } = require("react");
const { createContext } = require("react");

const CartContext = createContext();

function CartProvider(props) {
  const [total, setTotal] = useState(0);
  const [listCart, setListCart] = useState([]);
  const values = [total, setTotal, listCart, setListCart];
  return (
    <CartContext.Provider value={values} {...props}></CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (typeof context === "undefined")
    throw new Error("useCart must be used within CartProvider");
  return context;
}

export { useCart, CartProvider };
