import React, { useState, useEffect } from "react";
import { FilterBarContainer, FilterBarButton } from "../../../styles/styles.js";
import { Button, Popover, Drawer } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import AllFilters from "./AllFilters.jsx";
import "./FilterBar.css";
import People from "./People.jsx";
import Planet from "./Planet.jsx";
import Location from "./Location.jsx";
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
  places,
  setPlaces,
  stages,
  setStages,
}) => {
  const [tagOptions, setTagOptions] = useState(null);
  const [locationOptions, setLocationOptions] = useState(null);
  const priceOptions = ["$", "$$", "$$$", "$$$$"];

  useEffect(() => {
    const callApi = async () => {
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://qualityco-backend.herokuapp.com"
          : "http://localhost:5000";
      const tagOptionsUrl = `${baseUrl}/api/productTags`;
      const locationOptionsUrl = `${baseUrl}/api/locations`;

      try {
        let tagResponse = await fetch(tagOptionsUrl);
        tagResponse = await tagResponse.json();
        setTagOptions(
          tagResponse.tags.map((tag) => _.pick(tag, ["tag", "type"]))
        );

        let locationResponse = await fetch(locationOptionsUrl);
        locationResponse = await locationResponse.json();
        setLocationOptions(
          _.sortBy(locationResponse.locations, (d) => d.location).map(
            (l) => l.location
          )
        );
      } catch (err) {
        console.error(err);
      }
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
  const locationContent = (
    <Location
      locationOptions={locationOptions}
      places={places}
      setPlaces={setPlaces}
      stages={stages}
      setStages={setStages}
      setPageNumber={setPageNumber}
      setLoading={setLoading}
    />
  );

  return (
    <FilterBarContainer>
      <Popover content={peopleContent} title="People" placement="bottom">
        <FilterBarButton
          icon={<FontAwesomeIcon icon="heart" />}
          highlighted={tags.filter((tag) => tag.type === "People").length > 0}
          onClick={() => {
            setPageNumber(1);
            if (
              _.isEqual(
                tags.filter((tag) => tag.type === "People"),
                tagOptions.filter((tag) => tag.type === "People")
              )
            ) {
              // uncheck all
              setTags([...tags.filter((tag) => tag.type !== "People")]);
            } else {
              // check all
              setTags([
                ...tags.filter((tag) => tag.type !== "People"),
                ...tagOptions.filter((tag) => tag.type === "People"),
              ]);
            }
            setLoading(true);
          }}
        >
          People
        </FilterBarButton>
      </Popover>
      <Popover content={planetContent} title="Planet" placement="bottom">
        <FilterBarButton
          icon={<FontAwesomeIcon icon="leaf" />}
          highlighted={tags.filter((tag) => tag.type === "Planet").length > 0}
          onClick={() => {
            setPageNumber(1);
            if (
              _.isEqual(
                tags.filter((tag) => tag.type === "Planet"),
                tagOptions.filter((tag) => tag.type === "Planet")
              )
            ) {
              // uncheck all
              setTags([...tags.filter((tag) => tag.type !== "Planet")]);
            } else {
              // check all
              setTags([
                ...tags.filter((tag) => tag.type !== "Planet"),
                ...tagOptions.filter((tag) => tag.type === "Planet"),
              ]);
            }
            setLoading(true);
          }}
        >
          Planet
        </FilterBarButton>
      </Popover>
      <Popover content={locationContent} title="Location" placement="bottom">
        <FilterBarButton
          icon={<FontAwesomeIcon icon="map-marker-alt" />}
          highlighted={places.length > 0 || stages.length > 0}
        >
          Location
        </FilterBarButton>
      </Popover>
      <Popover content={priceContent} title="Price" placement="bottom">
        <FilterBarButton
          icon={<FontAwesomeIcon icon="dollar-sign" />}
          highlighted={price.length > 0}
          onClick={() => {
            setPageNumber(1);
            if (_.isEqual(price, priceOptions)) {
              // uncheck all
              setPrice([]);
            } else {
              // check all
              setPrice(priceOptions);
            }
            setLoading(true);
          }}
        >
          Price
        </FilterBarButton>
      </Popover>
      <Button
        onClick={() => setShowDrawer(true)}
        style={{ marginRight: "3px" }}
      >
        All filters
      </Button>
      <Drawer
        placement="left"
        visible={showDrawer}
        closable={false}
        onClose={() => setShowDrawer(false)}
      >
        <AllFilters
          peopleContent={peopleContent}
          planetContent={planetContent}
          locationContent={
            <Location
              locationOptions={locationOptions}
              places={places}
              setPlaces={setPlaces}
              stages={stages}
              setStages={setStages}
              setPageNumber={setPageNumber}
              setLoading={setLoading}
              overrideWidth={true} // in the sidebar, the width can't be fixed at 300px
            />
          }
          priceContent={priceContent}
          setPageNumber={setPageNumber}
          setTags={setTags}
          setPrice={setPrice}
          setLoading={setLoading}
          setPlaces={setPlaces}
          setStages={setStages}
        />
      </Drawer>
    </FilterBarContainer>
  );
};

export default FilterBar;
