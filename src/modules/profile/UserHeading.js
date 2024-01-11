/** @format */

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const UserHeadingStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.lineGray};

  .user-title {
    color: ${(props) => props.theme.textPrimary};
    font-size: 24px;
    font-weight: 500;
    text-transform: capitalize;
  }
  .user-desc {
    color: ${(props) => props.theme.text};
    font-size: 14px;
  }
`;

const UserHeading = ({ children, title = "" }) => {
  return (
    <UserHeadingStyled>
      <h3 className="user-title">{title}</h3>
      <span className="user-desc">{children}</span>
    </UserHeadingStyled>
  );
};

UserHeading.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default UserHeading;
