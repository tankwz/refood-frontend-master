/** @format */

import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => {
  return <>{message && <p className="text-red-500">{message}</p>}</>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
