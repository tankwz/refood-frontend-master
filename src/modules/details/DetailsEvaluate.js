/** @format */

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const DetailsEvaluateStyled = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.text};
  font-weight: 400;
  letter-spacing: 1px;
`;

const DetailsEvaluate = ({ className = "", desc }) => {
  const { describe } = desc;
  return (
    <DetailsEvaluateStyled className={className}>
      <p>{describe}</p>
    </DetailsEvaluateStyled>
  );
};

DetailsEvaluate.propTypes = {
  className: PropTypes.string,
  desc: PropTypes.object,
};

export default DetailsEvaluate;
