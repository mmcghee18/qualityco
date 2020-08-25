import React, { useState, useEffect } from "react";
import {
  FilterBarContainer,
  FilterPopup,
  SwitchRow,
  SwitchLabel,
} from "../../../styles/styles.js";
import { Button, Popover, Checkbox, Drawer, Switch, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import states from "./states.js";
const { Option } = Select;

const Local = () => {
  return (
    <FilterPopup overrideWidth={true}>
      <Select
        mode="multiple"
        placeholder="Select state(s)"
        onChange={(value) => console.log(value)}
      >
        {states.map((state, i) => (
          <Option key={i}>{state}</Option>
        ))}
      </Select>
      <SwitchRow>
        <Switch size="small" />
        <SwitchLabel>Designed</SwitchLabel>
      </SwitchRow>
      <SwitchRow>
        <Switch size="small" />
        <SwitchLabel>Warehoused</SwitchLabel>
      </SwitchRow>
      <SwitchRow>
        <Switch size="small" />
        <SwitchLabel>Manufactured</SwitchLabel>
      </SwitchRow>
      <SwitchRow>
        <Switch size="small" />
        <SwitchLabel>Company HQ</SwitchLabel>
      </SwitchRow>
    </FilterPopup>
  );
};

export default Local;
