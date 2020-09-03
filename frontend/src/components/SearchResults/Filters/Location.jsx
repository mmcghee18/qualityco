import React from "react";
import { FilterPopup, SwitchRow, SwitchLabel } from "../../../styles/styles.js";
import { Switch, Select } from "antd";
import _ from "lodash";
import states from "./states.js";
const { Option } = Select;

const Location = ({
  places,
  setPlaces,
  stages,
  setStages,
  setPageNumber,
  setLoading,
  overrideWidth,
}) => {
  const switchChange = (id, checked) => {
    if (places.length > 0) setPageNumber(1);

    if (checked) {
      setStages([...stages, id]);
    } else {
      const index = stages.findIndex((stage) => stage === id);
      setStages([...stages.slice(0, index), ...stages.slice(index + 1)]);
    }
    if (places.length > 0) setLoading(true);
  };

  return (
    <FilterPopup overrideWidth={overrideWidth}>
      <Select
        mode="multiple"
        placeholder="Select state(s)"
        value={places}
        onChange={(value) => {
          if (stages.length > 0) setPageNumber(1);
          setPlaces(value);
          if (stages.length > 0) setLoading(true);
        }}
      >
        {states.map((state, i) => (
          <Option key={i} value={state}>
            {state}
          </Option>
        ))}
      </Select>
      <SwitchRow>
        <Switch
          size="small"
          checked={stages.includes("designedIn")}
          onChange={(checked) => switchChange("designedIn", checked)}
        />
        <SwitchLabel>Designed in</SwitchLabel>
      </SwitchRow>
      <SwitchRow>
        <Switch
          size="small"
          checked={stages.includes("madeIn")}
          onChange={(checked) => switchChange("madeIn", checked)}
        />
        <SwitchLabel>Made in</SwitchLabel>
      </SwitchRow>
    </FilterPopup>
  );
};

export default Location;
