/** @format */

import React from "react";
import PropTypes from "prop-types";
import { DropdownProvider } from "./dropdown-context";

const Dropdown = ({ children, className = "", ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className={`relative inline-block w-full ${className}`}>
        {children}
      </div>
    </DropdownProvider>
  );
};

Dropdown.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Dropdown;
