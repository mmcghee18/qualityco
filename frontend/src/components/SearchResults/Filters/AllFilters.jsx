import React from "react";
import { Collapse, Button } from "antd";
import "./AllFilters.css";
const { Panel } = Collapse;

const AllFilters = ({
  peopleContent,
  planetContent,
  localContent,
  priceContent,
  setPageNumber,
  setTags,
  setPrice,
  setLoading,
  setPlaces,
  setStages,
}) => {
  return (
    <>
      <div>
        <Button
          onClick={() => {
            setPageNumber(1);
            setTags([]);
            setPrice([]);
            setPlaces([]);
            setStages([]);
            setLoading(true);
          }}
          style={{ marginBottom: "10px" }}
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
          <Panel header="Local" key="1">
            {localContent}
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
      </div>
    </>
  );
};

export default AllFilters;
