import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import { Input, Select, Tooltip } from "antd";
import { CollapsableSearch } from "../../styles/styles.js";
const { Search } = Input;
const { Option } = Select;

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  setType,
  setLoading,
  expandBar,
  setExpandBar,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [searchBarContent, setSearchBarContent] = useState(null);

  useEffect(() => {
    setSearchBarContent(searchTerm);
  }, [searchTerm]);

  const selectBefore = (
    <Select
      defaultValue="Products"
      className="select-before"
      onChange={(value) => {
        setLoading(true);
        setType(value.toLowerCase());
      }}
    >
      <Option value="Products">Products</Option>
      <Option value="Services">Services</Option>
    </Select>
  );

  return (
    <>
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
              setLoading(true);
              setSearchTerm(value);
            }
          }}
          style={{ width: "60%", borderRadius: "5px" }}
        />
      </Tooltip>
    </>
  );
};

export default SearchBar;
