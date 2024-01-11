/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import { IconEyeClose, IconEyeOpen } from "components/icon";

const InputPasswordToggle = ({
  control,
  name = "",
  className = "",
  placeholder = "",
}) => {
  const [togglePassword, setTogglePassword] = useState(false);
  return (
    <div className={className}>
      <Input
        type={togglePassword ? "text" : "password"}
        name={name ? `${name}` : "password"}
        placeholder={placeholder}
        control={control}
      >
        {togglePassword ? (
          <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
        ) : (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        )}
      </Input>
    </div>
  );
};

InputPasswordToggle.propTypes = {
  control: PropTypes.any.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputPasswordToggle;
