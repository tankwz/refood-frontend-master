/** @format */

import React from "react";
import PropTypes from "prop-types";
import { useDropdown } from "./dropdown-context";
import { Link } from "react-router-dom";

const Option = ({
  className = "",
  onClick = () => {},
  children = "",
  to = "",
}) => {
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  if (to) {
    return (
      <div
        className={`flex items-center justify-between px-6 py-2 text-lg transition-all cursor-pointer hover:text-primary hover:bg-bgPrimary ${className}`}
      >
        <Link to={to} style={{ display: "block" }}>
          {children}
        </Link>
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-between px-6 py-2 text-lg transition-all cursor-pointer hover:text-primary hover:bg-bgPrimary ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

Option.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  setShow: PropTypes.bool,
  className: PropTypes.string,
  to: PropTypes.string,
};

export default Option;
