/** @format */

import styled, { css } from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const InputStyles = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    /* padding: ${(props) =>
      props.hasIcon ? "20px 60px 20px 20px" : "20px"}; */
    padding: 10px;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
    ${(props) =>
      props.kind === "primary" &&
      css`
        background-color: ${(props) => props.theme.borderLight};
      `};
    ${(props) =>
      props.kind === "secondary" &&
      css`
        background-color: #fff;
        border: 1px solid ${(props) => props.theme.line};
        border-radius: 8px;
        color: ${(props) => props.theme.text};
        font-weight: 400;
      `};
  }
  input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input::-moz-input-placeholder {
    color: #84878b;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: ${(props) => props.theme.textPrimary};
    cursor: pointer;
  }
  .input-icon:hover {
    color: ${(props) => props.theme.primary};
    transition: all 0.3s linear;
  }
`;
const Input = ({
  name = "",
  type = "text",
  kind = "primary",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputStyles hasIcon={children ? true : false} kind={kind} {...props}>
      <input id={name} type={type} {...field} {...props} />
      {children ? <div className="input-icon">{children}</div> : null}
    </InputStyles>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.any,
  control: PropTypes.any.isRequired,
  kind: PropTypes.oneOf(["primary", "secondary"]),
};

export default Input;
