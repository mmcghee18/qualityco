import React, { useEffect, useState } from "react";
import queryString from "query-string";
import SearchBar from "../Search/SearchBar.jsx";
import { ResultsWrapper } from "../../styles/styles.js";
import Filters from "./Filters.jsx";
import ResultsList from "./ResultsList.jsx";

const SearchResults = ({ location }) => {
  const queryParams = queryString.parse(location.search);
  console.log(queryParams);

  return (
    <ResultsWrapper>
      <SearchBar defaultValue={queryParams.q} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignSelf: "flex-start",
          marginTop: "30px",
        }}
      >
        <Filters />
        <ResultsList />
      </div>
    </ResultsWrapper>
  );
};

export default SearchResults;
