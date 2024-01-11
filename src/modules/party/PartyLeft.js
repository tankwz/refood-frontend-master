/** @format */

import SearchType from "modules/search/SearchType";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findPartyAll, findSearchParty } from "store/party/slice";
import styled from "styled-components";
const queryString = require("query-string");

const PartyLeftStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .pl-item {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 600;
    color: ${(props) => props.theme.text};
    margin-bottom: 20px;
    letter-spacing: 1px;
    cursor: default;
  }
`;

const PartyLeft = () => {
  const [typeSelect, setTypeSelect] = useState([]);
  const [query, setQuery] = useState("");
  // const [values, setValues] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Set query when change
  useEffect(() => {
    const types = typeSelect[0] !== undefined ? typeSelect[0] : {};

    const values = Object.assign({}, types);
    if (typeSelect[0] === undefined) delete values.type;
    const q = queryString.stringify(values);
    setQuery(q);
  }, [typeSelect]);

  useEffect(() => {
    if (query) {
      dispatch(findSearchParty(query));
      navigate(`/party/?${query}`);
    } else {
      dispatch(findPartyAll({ pageCurrent: 1, countOnPage: 12 }));
      navigate(`/party`);
    }
  }, [dispatch, navigate, query]);

  return (
    <PartyLeftStyled>
      <div className="pl-item">
        <SearchType setTypeSelect={setTypeSelect}></SearchType>
      </div>
    </PartyLeftStyled>
  );
};

export default PartyLeft;
