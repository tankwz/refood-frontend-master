/** @format */

import React from "react";
import PropTypes from "prop-types";

const SectionLeft = ({ className = "", children }) => {
  return (
    <div className={`w-[300px] flex flex-col gap-[50px] ${className}`}>
      {children}
    </div>
  );
};

SectionLeft.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default SectionLeft;
