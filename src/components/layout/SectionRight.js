/** @format */

import React from "react";
import PropTypes from "prop-types";

const SectionRight = ({ className = "", children }) => {
  return <div className={`w-[900px] p-[15px] ${className}`}>{children}</div>;
};

SectionRight.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default SectionRight;
