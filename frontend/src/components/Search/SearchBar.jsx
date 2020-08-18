import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import { Redirect } from "react-router-dom";
import { Input, Select } from "antd";
const { Search } = Input;
const { Option } = Select;

const SearchBar = ({
  homePage,
  defaultValue,
  setLoading,
  setSearchTerm,
  setType,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [q, setQ] = useState(null);
  const [t, setT] = useState("products");

  const selectBefore = (
    <Select
      defaultValue="Products"
      className="select-before"
      onChange={(value) => {
        if (homePage) {
          setT(value.toLowerCase());
        } else {
          setType(value.toLowerCase());
        }
      }}
    >
      <Option value="Products">Products</Option>
      <Option value="Services">Services</Option>
    </Select>
  );

  return (
    <>
      {redirect && homePage && <Redirect to={`/search?type=${t}&q=${q}`} />}
      <Search
        defaultValue={defaultValue}
        addonBefore={selectBefore}
        placeholder="I'm looking for..."
        onSearch={(value) => {
          if (setLoading) setLoading(true);

          if (homePage) {
            setQ(value);
            setRedirect(true);
          } else {
            setSearchTerm(value);
          }
        }}
        style={{ width: "80%", maxWidth: "650px", borderRadius: "5px" }}
      />
    </>
  );
};

export default SearchBar;
