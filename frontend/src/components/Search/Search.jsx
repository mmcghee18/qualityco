import React from "react";
import SearchBar from "./SearchBar.jsx";
import { SearchContainer, SearchTitle } from "../../styles/styles.js";

const Search = () => {
  return (
    <SearchContainer>
      <SearchTitle>Find the right product for you, instantly.</SearchTitle>
      <SearchBar />
    </SearchContainer>
  );
};

export default Search;
