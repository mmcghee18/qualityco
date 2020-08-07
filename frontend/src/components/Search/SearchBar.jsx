import React, { useState } from "react";
import "./SearchBar.css";
import { Redirect } from "react-router-dom";
import { Input, Select } from "antd";
const { Search } = Input;
const { Option } = Select;

const SearchBar = () => {
  const [showResults, setShowResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [type, setType] = useState("products");

  const selectBefore = (
    <Select
      defaultValue="Products"
      className="select-before"
      onChange={(value) => setType(value.toLowerCase())}
    >
      <Option value="Products">Products</Option>
      <Option value="Services">Services</Option>
    </Select>
  );

  if (showResults) {
    return <Redirect to={`/search?type=${type}&q=${searchTerm}`} />;
  }
  return (
    <Search
      addonBefore={selectBefore}
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
