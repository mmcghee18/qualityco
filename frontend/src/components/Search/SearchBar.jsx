import React, { useState } from "react";
import "./SearchBar.css";
import { Redirect } from "react-router-dom";
import { Input } from "antd";
const { Search } = Input;

const SearchBar = () => {
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);

  if (showResults) {
    //return <Redirect to={"/search"} />;
    return <Redirect to={`/search?q=${searchTerm}`} />;
  }
  return (
    <Search
      placeholder="I'm looking for..."
      onSearch={(value) => {
        setSearchTerm(value);
        setShowResults(true);
      }}
      style={{ width: "80%", maxWidth: "650px", borderRadius: "5px" }}
    />
  );
};

export default SearchBar;
