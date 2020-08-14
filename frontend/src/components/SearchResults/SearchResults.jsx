import React, { useState, useEffect } from "react";
import queryString from "query-string";
import SearchBar from "../Search/SearchBar.jsx";
import {
  SearchResultsWrapper,
  SearchFilterBar,
  ResultsBody,
  FiltersButton,
} from "../../styles/styles.js";
import Filters from "./Filters.jsx";
import ResultsList from "./ResultsList.jsx";
import { Drawer } from "antd";
import useDeepCompareEffect from "use-deep-compare-effect";

const SearchResults = ({ location }) => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  const queryParams = queryString.parse(location.search);

  useDeepCompareEffect(() => {
    const callApi = async () => {
      const result = await fetch(
        `http://localhost:5000/api/${queryParams.type ? queryParams.type : ""}${
          queryParams.q ? `?q=${queryParams.q}` : ""
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          setItems(data);
          setLoading(false);
        });
    };
    callApi();
  }, [queryParams]);

  return (
    <SearchResultsWrapper>
      <SearchFilterBar>
        <FiltersButton onClick={() => setShowDrawer(true)}>
          Filters
        </FiltersButton>
        <SearchBar defaultValue={queryParams.q} setLoading={setLoading} />
      </SearchFilterBar>

      <ResultsBody>
        <Filters />
        <Drawer
          placement="left"
          visible={showDrawer}
          closable={false}
          onClose={() => setShowDrawer(false)}
        >
          <Filters visibleOverride={true} />
        </Drawer>

        <ResultsList items={items} loading={loading} />
      </ResultsBody>
    </SearchResultsWrapper>
  );
};

export default SearchResults;
