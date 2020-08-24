import React from "react";
import { Collapse, Button } from "antd";
import "./AllFilters.css";
import { FiltersWrapper } from "../../styles/styles.js";
const { Panel } = Collapse;

const AllFilters = ({
  peopleContent,
  planetContent,
  priceContent,
  setPageNumber,
  setTags,
  setPrice,
  setLoading,
}) => {
  return (
    <>
      <FiltersWrapper>
        <Button
          onClick={() => {
            setPageNumber(1);
            setTags([]);
            setPrice([]);
            setLoading(true);
          }}
        >
          Clear all
        </Button>
        <Collapse
          defaultActiveKey="1"
          bordered={false}
          style={{ backgroundColor: "white" }}
        >
          <Panel header="People" key="1">
            {peopleContent}
          </Panel>
        </Collapse>
        <Collapse
          defaultActiveKey="1"
          bordered={false}
          style={{ backgroundColor: "white" }}
        >
          <Panel header="Planet" key="1">
            {planetContent}
          </Panel>
        </Collapse>
        <Collapse
          defaultActiveKey="1"
          bordered={false}
          style={{ backgroundColor: "white" }}
        >
          <Panel header="Price" key="1">
            {priceContent}
          </Panel>
        </Collapse>
      </FiltersWrapper>
    </>
  );
};

export default AllFilters;
