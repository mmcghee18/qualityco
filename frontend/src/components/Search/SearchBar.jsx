import React from "react";
import "./SearchBar.css";
import { Input } from "antd";
const { Search } = Input;

const SearchBar = () => {
  return (
    <Search
      placeholder="I'm looking for..."
      onSearch={(value) => console.log(value)}
      style={{ width: "80%", maxWidth: "650px", borderRadius: "5px" }}
    />
  );
};

export default SearchBar;
