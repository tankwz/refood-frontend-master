/** @format */

import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const TextareaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    padding: 20px;
    background-color: ${(props) => props.theme.grayLight};
    /* border-radius: 8px; */
    font-weight: 400;
    transition: all 0.2s linear;
    border: 1px solid #dadada;
    resize: none;
    min-height: ${(props) => props.height || "200px"};
  }
  textarea:focus {
    background-color: white;
  }
  textarea::-webkit-textarea-placeholder {
    color: ${(props) => props.theme.textPlaceHoder};
  }
  input::-moz-input-placeholder {
    color: ${(props) => props.theme.textPlaceHoder};
  }
`;
const Textarea = ({
  name = "",
  type = "type",
  children,
  control,
  className = "",
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextareaStyles {...props}>
      <textarea
        id={name}
        type={type}
        className={className}
        {...field}
        {...props}
      />
    </TextareaStyles>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.any,
  control: PropTypes.any.isRequired,
  className: PropTypes.string,
};

export default Textarea;
