import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import { Input, Select, Tooltip } from "antd";
import { CollapsableSearch } from "../../styles/styles.js";
import _ from "lodash";
const { Option } = Select;

const CollapsableSearchBar = ({
  searchTerm,
  setSearchTerm,
  type,
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
      value={_.upperFirst(type)}
      className={expandBar ? "select-before-visible" : "select-before-hidden"}
      onChange={(value) => {
        setLoading(true);
        setType(value.toLowerCase());
      }}
      onFocus={() => setExpandBar(true)}
      onBlur={() => setExpandBar(false)}
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
        <CollapsableSearch
          className="collapsable-search"
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
          onFocus={() => setExpandBar(true)}
          onBlur={() => setExpandBar(false)}
          expandBar={expandBar}
        />
      </Tooltip>
    </>
  );
};

export default CollapsableSearchBar;
