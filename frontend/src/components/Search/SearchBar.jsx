import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "./SearchBar.css";
import { Redirect } from "react-router-dom";
import { Input, Select, Tooltip } from "antd";
const { Search } = Input;
const { Option } = Select;

const SearchBar = ({
  homePage,
  defaultValue,
  setLoading,
  setSearchTerm,
  setType,
  setPageNumber,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [searchBarContent, setSearchBarContent] = useState(defaultValue);
  const [q, setQ] = useState(null);
  const [t, setT] = useState("products");

  useEffect(() => {
    setSearchBarContent(defaultValue);
  }, [defaultValue]);

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
      {redirect && homePage && (
        <Redirect to={`/search?${queryString.stringify({ type: t, q })}`} />
      )}
      <Tooltip
        title="Please include a search term."
        placement="bottom"
        visible={tooltipVisible}
      >
        <Search
          value={searchBarContent}
          addonBefore={selectBefore}
          placeholder="I'm looking for..."
          onChange={(e) => {
            setTooltipVisible(false);
            setSearchBarContent(e.target.value);
          }}
          onSearch={(value) => {
            if (value.length === 0) {
              setTooltipVisible(true);
            } else {
              if (setLoading) setLoading(true);

              if (homePage) {
                setQ(value);
                setRedirect(true);
              } else {
                setPageNumber(1);
                setSearchTerm(value);
              }
            }
          }}
          style={{ width: "80%", maxWidth: "650px", borderRadius: "5px" }}
        />
      </Tooltip>
    </>
  );
};

export default SearchBar;
