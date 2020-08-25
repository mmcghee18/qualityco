import React from "react";
import { FilterPopup } from "../../../styles/styles.js";
import { Checkbox } from "antd";

const People = ({ tags, tagOptions, setLoading, setPageNumber, setTags }) => {
  return (
    <FilterPopup>
      <Checkbox.Group
        value={tags
          .filter((tag) => tag.type === "People")
          .map((tag) => tag.tag)}
        options={tagOptions.map((option) => option.tag)}
        onChange={(checkedValues) => {
          setPageNumber(1);
          setTags([
            ...tags.filter((tag) => tag.type !== "People"),
            ...checkedValues.map((value) => ({ tag: value, type: "People" })),
          ]);
          setLoading(true);
        }}
      ></Checkbox.Group>
    </FilterPopup>
  );
};

export default People;
