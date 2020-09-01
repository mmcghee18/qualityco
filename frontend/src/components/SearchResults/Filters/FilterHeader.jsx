import React, { useState, useEffect } from "react";
import {
  FilterBarContainer,
  FilterHeaderWrapper,
} from "../../../styles/styles.js";
import { Switch } from "antd";

const FilterHeader = ({ title }) => {
  return (
    <FilterHeaderWrapper>
      <div>{title}</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "5px" }}>OR</div>
        <Switch size="small" />
        <div style={{ marginLeft: "5px" }}>AND</div>
      </div>
    </FilterHeaderWrapper>
  );
};

export default FilterHeader;
