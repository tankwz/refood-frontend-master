/** @format */

import styled, { css } from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import { LoadingSpinner } from "components/loading";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  height: ${(props) => props.height || "66px"};
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: #fff;
      background-color: ${(props) => props.theme.primary};
    `};
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: white;
      background-color: ${(props) => props.theme.blueBold};
    `};
  ${(props) =>
    props.kind === "none" &&
    css`
      color: ${(props) => props.theme.textGray};
      background-color: none;
    `};
  ${(props) =>
    props.kind === "not-bg" &&
    css`
      color: ${(props) => props.theme.primary};
      border: 1px solid ${(props) => props.theme.primary};
      background-color: ${(props) => props.theme.lightBlue};
    `};
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
/**
 * @param {*} onClick Handler onClick
 * @requires
 * @param {string} type Type of button 'button' | 'submit'
 */
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  kind = "primary",
  className,
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;

  return (
    <ButtonStyles
      type={type}
      kind={kind}
      onClick={onClick}
      className={className}
      {...props}
    >
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  kind: PropTypes.oneOf(["primary", "secondary", "none", "not-bg"]),
  className: PropTypes.string,
};

export default Button;
