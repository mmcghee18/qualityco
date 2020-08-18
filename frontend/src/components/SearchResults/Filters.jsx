import React, { useState, useEffect } from "react";
import { Checkbox, Collapse, Switch } from "antd";
import _ from "lodash";
import "./Filters.css";
import {
  SwitchRow,
  SwitchLabel,
  FilterSection,
  FiltersWrapper,
} from "../../styles/styles.js";
import { tags as tagOptions, price as priceOptions } from "./filters.js";
const { Panel } = Collapse;

const Filters = ({ tags, setTags, price, setPrice, visibleOverride }) => {
  return (
    <>
      <FiltersWrapper visibleOverride={visibleOverride}>
        {/* Tags */}
        <Collapse
          defaultActiveKey="1"
          bordered={false}
          style={{ backgroundColor: "white" }}
        >
          <Panel header="Tags" key="1">
            <FilterSection>
              <Checkbox.Group
                value={tags}
                options={tagOptions}
                onChange={(checkedValues) => {
                  setTags(checkedValues);
                }}
              />
            </FilterSection>
          </Panel>
        </Collapse>

        {/* Shop local */}
        <FilterSection>
          <p>Shop local?</p>
          <SwitchRow>
            <Switch size="small" />
            <SwitchLabel>Sourced</SwitchLabel>
          </SwitchRow>
          <SwitchRow>
            <Switch size="small" />
            <SwitchLabel>Manufactured</SwitchLabel>
          </SwitchRow>
          <SwitchRow>
            <Switch size="small" />
            <SwitchLabel>Warehoused</SwitchLabel>
          </SwitchRow>
        </FilterSection>

        {/* Price */}
        <FilterSection>
          <p>Price</p>
          <Checkbox.Group
            value={price}
            options={priceOptions}
            onChange={(checkedValues) => {
              setPrice(checkedValues);
            }}
          />
        </FilterSection>

        {/* Number of results */}
        <FilterSection>
          <p># Results</p>
          <Checkbox>1-2</Checkbox>
          <Checkbox>3-5</Checkbox>
          <Checkbox>6-10</Checkbox>
          <Checkbox>All</Checkbox>
        </FilterSection>
      </FiltersWrapper>
    </>
  );
};

export default Filters;
