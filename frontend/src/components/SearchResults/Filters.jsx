import React, { useState, useEffect } from "react";
import { Checkbox, Collapse, Switch } from "antd";
import "./Filters.css";
import {
  SwitchRow,
  SwitchLabel,
  FilterSection,
  FiltersWrapper,
} from "../../styles/styles.js";
const { Panel } = Collapse;

const Filters = ({
  tags,
  setTags,
  price,
  setPrice,
  visibleOverride,
  setLoading,
  setPageNumber,
}) => {
  const [tagOptions, setTagOptions] = useState(null);
  const priceOptions = ["$", "$$", "$$$", "$$$$"];

  useEffect(() => {
    const callApi = async () => {
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://qualityco-backend.herokuapp.com"
          : "http://localhost:5000";
      const apiUrl = `${baseUrl}/api/tags`;

      await fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setTagOptions(data.tags);
        });
    };
    callApi();
  }, []);

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
                options={
                  tagOptions ? tagOptions.map((option) => option.tag) : []
                }
                onChange={(checkedValues) => {
                  setPageNumber(1);
                  setTags(checkedValues);
                  setLoading(true);
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
              setPageNumber(1);
              setPrice(checkedValues);
              setLoading(true);
            }}
          />
        </FilterSection>
      </FiltersWrapper>
    </>
  );
};

export default Filters;
