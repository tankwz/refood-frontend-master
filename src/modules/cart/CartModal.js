/** @format */

import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import ProductPrice from "modules/products/ProductPrice";
import priceVN from "utils/priceVN";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartDetail } from "store/cart/slice";
import { Button } from "components/button";
import { useCart } from "contexts/cart-context";

const CartStyled = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  z-index: 999;
  padding: 20px;
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.line};
  border-radius: 6px;
  display: none;
  transition: ease-in-out 0.3s linear;
  .cart-lists {
    position: inherit;
    width: 300px;
    max-height: 200px;
    overflow-y: auto;
    border-bottom: 1px solid ${(props) => props.theme.borderLight};
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .cart-content {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .cart-total {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .total-name {
    color: ${(props) => props.theme.text};
  }
  .total-price {
    color: ${(props) => props.theme.red};
  }
  .cart-btn {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
  }
  .btn-details {
    width: 100%;
    border: 1px solid ${(props) => props.themeline};
    .details-name {
      color: #3e445a;
      font-size: 14px;
    }
  }
  .btn-pay {
    width: 100%;
    background-color: #ed174a;
    .pay-name {
      color: #fff;
      font-size: 14px;
    }
  }
  .btn-pay:hover {
    opacity: 0.8;
    transition: all 0.3s linear;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    .cart-lists {
      width: 280px;
    }
  }
`;

const CartModal = ({ className = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [total] = useCart();
  const { cart } = useSelector((state) => state.cart);

  // Get list cart
  useEffect(() => {
    function getCart() {
      dispatch(getCartDetail());
    }
    getCart();
  }, [dispatch]);

  return (
    <CartStyled className={className}>
      <div className="cart-content">
        <div className="cart-lists scroll">
          {cart?.length > 0 ? (
            cart.map((item) => (
              <CartItem key={item.FoodDetailID} data={item}></CartItem>
            ))
          ) : (
            <span className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ea2b0f"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </span>
          )}
        </div>
        <div className="cart-total">
          <span className="total-name">Tổng:</span>
          <ProductPrice className="total-price">{priceVN(total)}</ProductPrice>
        </div>
        <div className="cart-btn">
          <Button
            className="btn-details"
            height="44px"
            kind="none"
            onClick={() => {
              navigate("/cart");
            }}
          >
            {cart?.length > 0 ? (
              <span className="details-name">Xem chi tiết</span>
            ) : (
              <span className="details-name">Thêm món ăn ngay</span>
            )}
          </Button>
          <Button
            className="btn-pay"
            height="44px"
            kind="none"
            onClick={() => {
              navigate("/order");
            }}
          >
            <span className="pay-name">Thanh toán</span>
          </Button>
        </div>
      </div>
    </CartStyled>
  );
};

CartModal.propTypes = {
  className: PropTypes.string,
};

export default CartModal;
