/** @format */

import UserModal from "modules/auth/UserModal";
import styled from "styled-components";
import SearchInput from "modules/search/SearchInput";
import PropTypes from "prop-types";
import CartModal from "modules/cart/CartModal";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { React } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "contexts/cart-context";
import ModalMenu from "components/modal/ModalMenu";
import MenuSideBar from "./MenuSideBar";
import useModal from "hooks/useModal";

const HeaderStyled = styled.div`
  padding-top: 30px;
  .ht-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ht-logo {
    display: flex;
    flex-direction: column;
    img {
      max-width: 164px;
      max-height: 44px;
    }
    span {
      display: inline-block;
      color: ${(props) => props.theme.text};
      font-size: 11px;
      margin-top: 2px;
      opacity: 0.5;
    }
  }
  .ht-buttons {
    display: flex;
    justify-content: cemter;
    align-items: center;
    gap: 20px;
  }
  .ht-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 1px solid ${(props) => props.theme.lineGray};
    background-color: #fff;
    color: ${(props) => props.theme.text};
    cursor: pointer;
  }
  .ht-icon:hover {
    color: ${(props) => props.theme.primary};
    border: 1px solid ${(props) => props.theme.primary};
    background-color: ${(props) => props.theme.lightBlue};
    transition: all 0.5s ease-out;
  }
  .ht-user {
    position: relative;
  }
  .ht-user:hover .user-info {
    transform: translateX(0);
    transition: all 0.3s linear;
    pointer-events: auto;
  }
  .ht-cart {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #fff1ee;
    border-color: #fff1ee;
    border: 1px solid #fff1ee;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    color: ${(props) => props.theme.red};
    cursor: pointer;
  }
  .ht-cart:hover {
    border: 1px solid ${(props) => props.theme.red};
    transition: all 0.5s ease-out;
  }
  .ht-cart:hover .cart-info {
    display: block;
    transition: ease-in-out 0.3s linear;
    pointer-events: auto;
  }
  .count {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background-color: ${(props) => props.theme.red};
    color: #fff;
    font-size: 10px;
    font-weight: 500;
    border-radius: 100%;
  }

  .menu {
    display: none;
    ${(props) => props.theme.text};
    cursor: pointer;
  }

  .user-btn {
    padding: 9px 20px;
    background-color: ${(props) => props.theme.primary};
    border-radius: 999px;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
  }
  .user-btn:hover {
    opacity: 0.8;
  }

  /* Desktop and Ipad pro*/
  @media (min-width: 1024px) and (max-width: 1263px) {
    .menu {
      display: block;
    }
    .ht-logo {
      img {
        max-width: 160px;
        max-height: 40px;
      }
      span {
        display: none;
      }
    }
  }

  /* Tablets and Ipads */
  @media (min-width: 768px) and (max-width: 1023px) {
    .menu {
      display: block;
    }
    .ht-logo {
      display: none;
      img {
        max-width: 140px;
        max-height: 20px;
      }
    }
    .ht-search {
      width: 450px;
    }
  }
  /* Mobile */
  @media (min-width: 320px) and (max-width: 767px) {
    .menu {
      display: block;
    }
    .ht-logo {
      span {
        display: none;
      }
    }
    .ht-search {
      display: none;
    }
    .ht-user,
    .user-btn {
      display: none;
    }
    .ht-cart:hover .cart-info {
      display: none;
      pointer-events: none;
    }
    .cart-info {
      display: none;
    }
  }
`;

const HeaderTop = ({ className = "" }) => {
  const { modalIsOpen, openModal, closeModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  const handleShowCart = () => {
    navigate("/cart");
  };
  const token = window.localStorage.getItem("accessToken");
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [, setTotal, , setListCart] = useCart();

  useEffect(() => {
    function getTotalPriceFood() {
      if (cart) {
        setListCart(cart);
        let result = 0;
        cart.forEach((item) => {
          result += item.FoodDishCount * item.FoodPrice;
        });
        setTotal(result);
      }
    }
    getTotalPriceFood();
  }, [cart, setListCart, setTotal]);

  // Modal cart display none when path current /cart
  useEffect(() => {
    if (location.pathname === "/cart") {
      const cart = document.querySelector(".cart-info");
      cart.style.display = "none";
    }
  }, [location.pathname]);

  const handleOpenMenu = () => {
    openModal();
  };
  return (
    <>
      <HeaderStyled className={className}>
        <div className="container">
          <div className="ht-main">
            <span className="menu" onClick={handleOpenMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </span>
            <ModalMenu modalIsOpen={modalIsOpen} closeModal={closeModal}>
              <MenuSideBar closeModal={closeModal} className=""></MenuSideBar>
            </ModalMenu>
            <div className="ht-logo">
              <Link to={"/"}>
                <img src="/refood-logo.png" alt="" />
              </Link>
              <span>Chỉ cần bạn thích - có ngay món ngon</span>
            </div>
            <SearchInput className="ht-search"></SearchInput>
            <div className="ht-buttons">
              {token || user ? (
                <div className="ht-cart" onClick={handleShowCart}>
                  <div className="cart">
                    <span className="cart-icon">
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
                          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </span>
                    <span className="count">{cart?.length}</span>
                  </div>
                  <CartModal className="cart-info"></CartModal>
                </div>
              ) : (
                <div className="ht-cart">
                  <div className="cart">
                    <span className="cart-icon">
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
                          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </span>
                    <span className="count">0</span>
                  </div>
                </div>
              )}
              {token || user ? (
                <div className="ht-user">
                  <div className="ht-icon">
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <UserModal className="user-info"></UserModal>
                </div>
              ) : (
                <Link to={"/login"}>
                  <button className="user-btn">Đăng nhập</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </HeaderStyled>
    </>
  );
};

HeaderTop.propTypes = {
  className: PropTypes.string,
};

export default HeaderTop;
