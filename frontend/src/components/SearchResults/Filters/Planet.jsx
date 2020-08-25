import React from "react";
import { FilterPopup } from "../../../styles/styles.js";
import { Checkbox } from "antd";
import _ from "lodash";

const Planet = ({ tags, tagOptions, setLoading, setPageNumber, setTags }) => {
  return (
    <FilterPopup>
      <Checkbox.Group
        value={tags
          .filter((tag) => tag.type === "Planet")
          .map((tag) => tag.tag)}
        options={tagOptions.map((option) => option.tag)}
        onChange={(checkedValues) => {
          setPageNumber(1);
          setTags([
            ...tags.filter((tag) => tag.type !== "Planet"),
            ...checkedValues.map((value) => ({ tag: value, type: "Planet" })),
          ]);
          setLoading(true);
        }}
      ></Checkbox.Group>
    </FilterPopup>
  );
};

export default Planet;
