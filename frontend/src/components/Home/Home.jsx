import React from "react";
import { SearchContainer, SearchTitle } from "../../styles/styles.js";
import SearchBar from "../NavBar/SearchBar.jsx";

const Home = ({ setSearchTerm, type, setType, setLoading }) => {
  return (
    <SearchContainer>
      <SearchTitle>Find the right product for you, instantly.</SearchTitle>
      <SearchBar
        setSearchTerm={setSearchTerm}
        type={type}
        setType={setType}
        setLoading={setLoading}
      />
    </SearchContainer>
  );
};

export default Home;
