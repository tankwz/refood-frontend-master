/** @format */

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import formatToDate from "utils/formatDate";

const DetailsMetaStyled = styled.div`
  margin-bottom: 8px;
  font-size: 16px;
  color: ${(props) => props.theme.text};
  font-weight: 500;
  letter-spacing: 1px;
  display: flex;
  gap: 6px;
  cursor: pointer;
  .meta-date {
    color: ${(props) => props.theme.textLight};
  }
`;

const DetailsMeta = ({ className = "", data }) => {
  const { RatingCustomer, RatingTime } = data;
  return (
    <DetailsMetaStyled className={className}>
      <strong className="meta-author">{RatingCustomer}</strong>
      <span>-</span>
      <span className="meta-date">{formatToDate(RatingTime)}</span>
    </DetailsMetaStyled>
  );
};

DetailsMeta.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};

export default DetailsMeta;
