import React from "react";
import SearchBar from "./SearchBar.jsx";
import { SearchContainer } from "../../styles/styles.js";

const Search = () => {
  return (
    <SearchContainer>
      <h1>Find the right product for you, instantly.</h1>
      <SearchBar />
    </SearchContainer>
  );
};

export default Search;
