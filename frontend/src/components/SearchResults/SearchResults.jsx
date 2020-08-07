import React, { useEffect, useState } from "react";
import queryString from "query-string";

const SearchResults = ({ location }) => {
  const queryParams = queryString.parse(location.search);
  console.log(queryParams);

  return <div>search results!</div>;
};

export default SearchResults;
