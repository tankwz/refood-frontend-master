/** @format */

import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";

const LabelStyles = styled.label`
  color: ${(props) => props.theme.text};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const Label = ({ htmlFor = "", children, className = "", ...props }) => {
  return (
    <LabelStyles htmlFor={htmlFor} {...props} className={className}>
      {children}
    </LabelStyles>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Label;
