import React from "react";
import queryString from "query-string";
import SearchBar from "../Search/SearchBar.jsx";
import { Column, ResultsBody } from "../../styles/styles.js";
import Filters from "./Filters.jsx";
import ResultsList from "./ResultsList.jsx";
import fakeData from "./fakeData.js";

const SearchResults = ({ location }) => {
  const queryParams = queryString.parse(location.search);
  console.log(queryParams);

  // Get the data from the API
  // For now, fake data

  return (
    <Column alignItems="center" padding="40px">
      <SearchBar defaultValue={queryParams.q} />
      <ResultsBody>
        <Filters />
        <ResultsList data={fakeData} />
      </ResultsBody>
    </Column>
  );
};

export default SearchResults;
