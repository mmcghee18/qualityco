import React, { useState, useEffect } from "react";
import queryString from "query-string";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import {
  SearchResultsWrapper,
  SearchFilterBar,
  FiltersButton,
} from "../../styles/styles.js";
import FilterBar from "./Filters/FilterBar.jsx";
import ResultsList from "./ResultsList.jsx";

let abortController = new AbortController();

const SearchResults = ({
  history,
  location,
  setSearchTerm,
  searchTerm,
  type,
  loading,
  setLoading,
}) => {
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState([]);
  const [places, setPlaces] = useState([]);
  const [stages, setStages] = useState([]);

  const [items, setItems] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // On a new search
  useEffect(() => {
    setPageNumber(1);
  }, [searchTerm, type]);

  useEffect(() => {
    const callApi = async () => {
      abortController.abort(); // cancel previous request
      abortController = new AbortController();

      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://qualityco-backend.herokuapp.com"
          : "http://localhost:5000";

      const params = queryString.stringify(
        _.pickBy(
          {
            page: pageNumber,
            pageSize,
            q: searchTerm,
            tags: tags.map((t) => t.tag),
            price,
            designedIn:
              places.length > 0 && stages.includes("designedIn") ? places : [],
            madeIn:
              places.length > 0 && stages.includes("madeIn") ? places : [],
          },
          (value, key) => value
        )
      );

      const apiUrl = `${baseUrl}/api/${type ? type : ""}?${params}`;
      const pageUrl = `/search?type=${type ? type : ""}&${params}`;
      history.push(pageUrl);

      try {
        await fetch(apiUrl, { signal: abortController.signal })
          .then((response) => response.json())
          .then((data) => {
            setItems(data);
            setLoading(false);
          });
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        } else {
          console.error(err);
        }
      }
    };
    callApi();
  }, [searchTerm, type, tags, price, pageNumber, pageSize, places, stages]);

  return (
    <SearchResultsWrapper>
      <FiltersButton onClick={() => setShowDrawer(true)}>Filters</FiltersButton>

      <FilterBar
        tags={tags}
        setTags={setTags}
        price={price}
        setPrice={setPrice}
        setLoading={setLoading}
        setPageNumber={setPageNumber}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        places={places}
        setPlaces={setPlaces}
        stages={stages}
        setStages={setStages}
      />

      <ResultsList
        items={items}
        loading={loading}
        setLoading={setLoading}
        setSearchTerm={setSearchTerm}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </SearchResultsWrapper>
  );
};

export default withRouter(SearchResults);
