/** @format */
import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";

const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 10px;
  /* margin-bottom: 16px; */
  &:last-child {
    margin-bottom: 0;
  }
`;
const Field = ({ children, className = "" }) => {
  return <FieldStyles className={className}>{children}</FieldStyles>;
};

Field.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Field;
