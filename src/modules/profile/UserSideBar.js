/** @format */

import styled from "styled-components";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { authGetUser } from "store/auth/slice";

const sideBarLink = [
  {
    title: "Tài Khoản Của Tôi",
    url: "/user/account/profile",
    icon: (
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
    ),
    subNav: [
      {
        title: "Hồ sơ",
        url: "/user/account/profile",
      },
      {
        title: "Địa chỉ",
        url: "/user/account/address",
      },
      {
        title: "Đổi mật khẩu",
        url: "/user/account/password",
      },
    ],
  },
  {
    title: "Đơn mua",
    url: "/user/order",
    icon: (
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
          d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
        />
      </svg>
    ),
    subNav: [
      {
        title: "Cập nhật đơn mua",
        url: "/user/order",
      },
      {
        title: "Cập nhật đặt tiệc",
        url: "/user/party",
      },
    ],
  },
];

const UserSideBarStyled = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  .sb-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 15px;
  }
  .sb-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 1px solid ${(props) => props.theme.lineGray};
    background-color: ${(props) => props.theme.lightBlue};
    color: ${(props) => props.theme.text};
    cursor: pointer;
    span {
      font-size: 24px;
      font-weight: 700;
    }
  }
  .sb-heading {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding-left: 15px;
  }
  .sb-name {
    color: ${(props) => props.theme.text};
    font-size: 14px;
    font-weight: 600;
  }
  .sb-edit {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    color: ${(props) => props.theme.textGray};
    a {
      display: block;
      font-size: 13px;
      text-transform: capitalize;
      text-align: center;
      padding-top: 3px;
    }
  }
  .sb-main {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .sb-parent {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    font-weight: 500;
    color: ${(props) => props.theme.textPrimary};
    text-transform: capitalize;
    font-size: 16px;
    cursor: pointer;
  }
  .sb-content {
    display: none;
  }
  .active-content {
    display: inline-block;
    transition: all 0.3s linear;
  }
  .sb-child {
    text-transform: capitalize;
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.theme.text};
    margin-top: 12px;
    padding-left: 36px;
  }
  .sb-parent:hover,
  .sb-child:hover {
    color: ${(props) => props.theme.red};
  }
  .sb-item:first-child {
    .sb-icon {
      color: ${(props) => props.theme.blueBold};
    }
  }
  .sb-item:last-child {
    .sb-icon {
      color: #f6ad00;
    }
  }
  .sb-item:nth-child(2),
  .sb-item:nth-child(3) {
    .sb-icon {
      color: ${(props) => props.theme.red};
    }
  }
`;

const UserSideBar = () => {
  const subNavRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    const snContent = document.querySelectorAll(".sb-content");
    switch (location.pathname) {
      case "/user/account/profile":
        snContent[0].classList.add("active-content");
        break;
      case "/user/order":
        snContent[1].classList.add("active-content");
        break;
      case "/user/order/detail":
        snContent[1].classList.add("active-content");
        break;
      case "/user/party":
        snContent[1].classList.add("active-content");
        break;
      case "/user/party/detail":
        snContent[1].classList.add("active-content");
        break;
      default:
        snContent[0].classList.add("active-content");
        break;
    }
    return () => {
      snContent[0].classList.remove("active-content");
      snContent[1].classList.remove("active-content");
    };
  }, []);
  const handleShowSubNav = (index) => {
    const subNav = subNavRef.current.children;
    const contentActive = document.querySelectorAll(".active-content");
    for (let i = 0; i < contentActive.length; i++) {
      contentActive[i].classList.remove("active-content");
    }
    const content = subNav[index]?.lastChild;
    if (content.classList.value === "sb-content") {
      subNav[index]?.lastChild.classList.add("active-content");
    }
  };
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchUserData() {
      try {
        dispatch(authGetUser());
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, [dispatch]);
  return (
    <UserSideBarStyled>
      <div className="sb-info">
        <div className="sb-img">
          <Link to={"/user/account/profile"}>
            <span>{user?.CustomerName.charAt(0)}</span>
          </Link>
        </div>
        <div className="sb-heading">
          <span className="sb-name">{user?.CustomerName}</span>
          <div className="sb-edit">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
              </svg>
            </div>
            <Link to={"/user/account/profile"}>Sửa hồ sơ</Link>
          </div>
        </div>
      </div>
      <div className="sb-main" ref={subNavRef}>
        {sideBarLink.map((link, index) => {
          if (link.subNav) {
            return (
              <div
                className="sb-item"
                key={link.title}
                onClick={() => handleShowSubNav(index)}
              >
                <NavLink to={link.url} className="sb-parent">
                  <span className="sb-icon">{link.icon}</span>
                  <span className="sb-text">{link.title}</span>
                </NavLink>
                <div className="sb-content">
                  {link.subNav.map((subLink) => (
                    <div className="sb-child" key={subLink.title}>
                      <NavLink to={subLink.url} className="sb-text">
                        {subLink.title}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <div
              className="sb-item"
              key={link.title}
              onClick={() => handleShowSubNav(index)}
            >
              <NavLink to={link.url} className="sb-parent">
                <span className="sb-icon">{link.icon}</span>
                <span className="sb-text">{link.title}</span>
              </NavLink>
            </div>
          );
        })}
      </div>
    </UserSideBarStyled>
  );
};

export default UserSideBar;
