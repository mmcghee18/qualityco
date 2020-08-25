import React, { useState, useEffect } from "react";
import { FilterBarContainer, FilterPopup } from "../../styles/styles.js";
import { Button, Popover, Checkbox, Drawer } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import AllFilters from "./AllFilters.jsx";
import "./FilterBar.css";

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
    <FilterPopup>
      <Checkbox.Group
        value={tags
          .filter((tag) => tag.type === "People")
          .map((tag) => tag.tag)}
        options={peopleTags.map((option) => option.tag)}
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
  const planetContent = (
    <FilterPopup>
      <Checkbox.Group
        value={tags
          .filter((tag) => tag.type === "Planet")
          .map((tag) => tag.tag)}
        options={planetTags.map((option) => option.tag)}
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

  const priceContent = (
    <FilterPopup>
      <Checkbox.Group
        value={price}
        options={priceOptions}
        onChange={(checkedValues) => {
          setPageNumber(1);
          setPrice(checkedValues);
          setLoading(true);
        }}
      ></Checkbox.Group>
    </FilterPopup>
  );

  return (
    <FilterBarContainer>
      <Popover content={peopleContent} title="People" placement="bottom">
        <Button icon={<FontAwesomeIcon icon="heart" />}>People</Button>
      </Popover>
      <Popover content={planetContent} title="Planet" placement="bottom">
        <Button icon={<FontAwesomeIcon icon="leaf" />}>Planet</Button>
      </Popover>
      <Button icon={<FontAwesomeIcon icon="map-marker-alt" />}>Local</Button>
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
