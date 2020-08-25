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
import AllFilters from "./AllFilters.jsx";
import "./FilterBar.css";
import People from "./People.jsx";
import Planet from "./Planet.jsx";
import Local from "./Local.jsx";
import Price from "./Price.jsx";

const FilterBar = ({
  tags,
  setTags,
  price,
  setPrice,
  setLoading,
  setPageNumber,
  showDrawer,
  setShowDrawer,
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

  const peopleTags = tagOptions
    ? tagOptions.filter((tag) => tag.type === "People")
    : [];
  const planetTags = tagOptions
    ? tagOptions.filter((tag) => tag.type === "Planet")
    : [];

  const peopleContent = (
    <People
      tags={tags}
      tagOptions={peopleTags}
      setLoading={setLoading}
      setPageNumber={setPageNumber}
      setTags={setTags}
    />
  );
  const planetContent = (
    <Planet
      tags={tags}
      tagOptions={planetTags}
      setLoading={setLoading}
      setPageNumber={setPageNumber}
      setTags={setTags}
    />
  );
  const priceContent = (
    <Price
      price={price}
      priceOptions={priceOptions}
      setPageNumber={setPageNumber}
      setPrice={setPrice}
      setLoading={setLoading}
    />
  );
  const localContent = <Local />;

  return (
    <FilterBarContainer>
      <Popover content={peopleContent} title="People" placement="bottom">
        <Button icon={<FontAwesomeIcon icon="heart" />}>People</Button>
      </Popover>
      <Popover content={planetContent} title="Planet" placement="bottom">
        <Button icon={<FontAwesomeIcon icon="leaf" />}>Planet</Button>
      </Popover>
      <Popover content={localContent} title="Local" placement="bottom">
        <Button icon={<FontAwesomeIcon icon="map-marker-alt" />}>Local</Button>
      </Popover>
      <Popover content={priceContent} title="Price" placement="bottom">
        <Button icon={<FontAwesomeIcon icon="dollar-sign" />}>Price</Button>
      </Popover>
      <div>
        <Button onClick={() => setShowDrawer(true)}>All filters</Button>
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
      </div>
      <Drawer
        placement="left"
        visible={showDrawer}
        closable={false}
        onClose={() => setShowDrawer(false)}
      >
        <AllFilters
          peopleContent={peopleContent}
          planetContent={planetContent}
          localContent={localContent}
          priceContent={priceContent}
          setPageNumber={setPageNumber}
          setTags={setTags}
          setPrice={setPrice}
          setLoading={setLoading}
        />
      </Drawer>
    </FilterBarContainer>
  );
};

export default FilterBar;
