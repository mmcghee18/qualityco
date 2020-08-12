import React from "react";
import { Checkbox, Collapse, Switch } from "antd";
import _ from "lodash";
import "./Filters.css";
import {
  Row,
  SwitchLabel,
  FilterSection,
  FiltersWrapper,
} from "../../styles/styles.js";
import { filters, prices } from "./filters.js";
const { Panel } = Collapse;

const Filters = ({ visibleOverride }) => {
  return (
    <FiltersWrapper visibleOverride={visibleOverride}>
      {/* Filters */}
      <Collapse
        defaultActiveKey="1"
        bordered={false}
        style={{ backgroundColor: "white" }}
      >
        <Panel header="Filters" key="1">
          <FilterSection>
            {_.keys(filters).map((key, i) => (
              <Checkbox key={i}>{filters[key]}</Checkbox>
            ))}
          </FilterSection>
        </Panel>
      </Collapse>

      {/* Shop local */}
      <FilterSection>
        <p>Shop local?</p>
        <Row alignItems="center">
          <Switch size="small" />
          <SwitchLabel>Sourced</SwitchLabel>
        </Row>
        <Row alignItems="center">
          <Switch size="small" />
          <SwitchLabel>Manufactured</SwitchLabel>
        </Row>
        <Row alignItems="center">
          <Switch size="small" />
          <SwitchLabel>Warehoused</SwitchLabel>
        </Row>
      </FilterSection>

      {/* Price */}
      <FilterSection>
        <p>Price</p>
        {_.keys(prices).map((key, i) => (
          <Checkbox key={i}>{prices[key]}</Checkbox>
        ))}
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
  );
};

export default Filters;
