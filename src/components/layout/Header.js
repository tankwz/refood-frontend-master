/** @format */

import React, { useEffect } from "react";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";
import { DropdownProvider } from "components/dropdown/dropdown-context";
import styled from "styled-components";

const HeaderStyled = styled.div`
  .is-sticky {
    position: fixed;
    z-index: 999;
    width: 100%;
    background-color: #fff;
    padding-bottom: 16px;
    animation: 1s ease-in-out;
    box-shadow: 0 8px 6px -6px ${(props) => props.theme.textGray};
  }
  .is-hb {
    display: none;
  }
`;

const Header = () => {
  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  const isSticky = (e) => {
    const header = document.querySelector(".ht");
    const headerBottom = document.querySelector(".hb");
    const scrollTop = window.scrollY;
    if (scrollTop >= 250) {
      header.classList.add("is-sticky");
      headerBottom.classList.add("is-hb");
    } else {
      header.classList.remove("is-sticky");
      headerBottom.classList.remove("is-hb");
    }
  };
  return (
    <HeaderStyled>
      <DropdownProvider>
        <HeaderTop className="ht"></HeaderTop>
        <HeaderBottom className="hb"></HeaderBottom>
      </DropdownProvider>
    </HeaderStyled>
  );
};

export default Header;
