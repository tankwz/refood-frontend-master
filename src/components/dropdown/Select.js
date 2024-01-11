/** @format */

import React from "react";
import PropTypes from "prop-types";
import { useDropdown } from "./dropdown-context";

const Select = ({
  placeholder = "",
  className = "",
  sizeIcon = "",
  iconRight = "",
  children = "",
}) => {
  const { toggle, show } = useDropdown();
  return (
    <div
      className={`inline-flex items-center justify-between  px-5 bg-white border border-grayf1 rounded-lg cursor-pointer text-sm text-[#9ca3af] ${className}`}
      onClick={toggle}
    >
      {children}
      <span>{placeholder}</span>
      <span className={iconRight}>
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 ${sizeIcon}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 ${sizeIcon}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </span>
    </div>
  );
};

Select.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  toggle: PropTypes.func,
  show: PropTypes.string,
  iconRight: PropTypes.string,
  children: PropTypes.object,
};

export default Select;
