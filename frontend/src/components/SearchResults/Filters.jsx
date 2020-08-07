import React, { useEffect, useState } from "react";
import { Checkbox, Collapse, Switch } from "antd";
import _ from "lodash";
import "./Filters.css";
import { filters, prices } from "./filters.js";
const { Panel } = Collapse;

const Filters = () => {
  console.log(filters);
  return (
    <div style={{ width: "200px" }}>
      {/* Filters */}
      <Collapse
        defaultActiveKey="1"
        bordered={false}
        style={{ backgroundColor: "white" }}
      >
        <Panel header="Filters" key="1">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {_.keys(filters).map((key, i) => (
              <Checkbox key={i}>{filters[key]}</Checkbox>
            ))}
          </div>
        </Panel>
      </Collapse>

      {/* Shop local */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>Shop local?</p>
        <div style={{ display: "flex" }}>
          <Switch />
          <p>Sourced</p>
        </div>
        <div style={{ display: "flex" }}>
          <Switch />
          <p>Manufactured</p>
        </div>
        <div style={{ display: "flex" }}>
          <Switch />
          <p>Warehoused</p>
        </div>
      </div>

      {/* Price */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>Price</p>
        {_.keys(prices).map((key, i) => (
          <Checkbox key={i}>{prices[key]}</Checkbox>
        ))}
      </div>

      {/* Number of results */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p># Results</p>
        <Checkbox>1-2</Checkbox>
        <Checkbox>3-5</Checkbox>
        <Checkbox>6-10</Checkbox>
        <Checkbox>All</Checkbox>
      </div>
    </div>
  );
};

export default Filters;
