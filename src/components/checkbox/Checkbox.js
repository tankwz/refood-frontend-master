/** @format */

import React from "react";
import PropTypes from "prop-types";
import { useController } from "react-hook-form";

const Checkbox = ({ checked, children, control, name, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label>
      <input
        checked={checked}
        type="checkbox"
        className="hidden-input"
        {...field}
        {...rest}
      />
      <div className="flex items-center font-medium cursor-pointer gap-x-3">
        <div
          className={`w-5 h-5 rounded flex items-center justify-center ${
            checked
              ? "bg-primary text-white"
              : "bg-white hover:bg-bgPrimary border-2 border-line text-transparent"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <span className="text-sm text-[#71778e] ">{children}</span>
      </div>
    </label>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.any,
  control: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
};

export default Checkbox;
