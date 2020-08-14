import React, { useState, useEffect } from "react";
import { Checkbox, Collapse, Switch } from "antd";
import queryString from "query-string";
import _ from "lodash";
import "./Filters.css";
import {
  SwitchRow,
  SwitchLabel,
  FilterSection,
  FiltersWrapper,
} from "../../styles/styles.js";
import { Redirect } from "react-router-dom";
import { tags, price } from "./filters.js";
const { Panel } = Collapse;

const Filters = ({ queryParams, visibleOverride }) => {
  const [tagsSelected, setTagsSelected] = useState([]);
  //const [priceSelected, setPriceSelected] = useState([]);

  const [redirect, setRedirect] = useState(false);

  return (
    <>
      {redirect ? (
        <Redirect
          to={`/search?type=${queryParams.type}&q=${queryParams.q}${
            tagsSelected.length > 0 ? `&tags=${tagsSelected.join()}` : ""
          }`}
        />
      ) : null}
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
                options={tags}
                onChange={(checkedValues) => {
                  setTagsSelected(checkedValues);
                  setRedirect(true);
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
            options={price}
            // onChange={(checkedValues) => {
            //   setPriceSelected(checkedValues);
            // }}
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
