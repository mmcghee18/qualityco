import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import { withRouter } from "react-router-dom";
import { Input, Select, Tooltip } from "antd";
import _ from "lodash";
const { Search } = Input;
const { Option } = Select;

const SearchBar = ({
  history,
  searchTerm,
  setSearchTerm,
  type,
  setType,
  setLoading,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [searchBarContent, setSearchBarContent] = useState(null);

  useEffect(() => {
    setSearchBarContent(searchTerm);
  }, [searchTerm]);

  const selectBefore = (
    <Select
      value={_.upperFirst(type)}
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
              history.push("/search");
            }
          }}
          style={{ width: "60%", borderRadius: "5px" }}
        />
      </Tooltip>
    </>
  );
};

export default withRouter(SearchBar);
