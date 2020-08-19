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

const SearchResults = ({ history, location }) => {
  const queryParams = queryString.parse(location.search);
  const [searchTerm, setSearchTerm] = useState(queryParams.q);
  const [type, setType] = useState(queryParams.type);
  const [tags, setTags] = useState(null);
  const [price, setPrice] = useState(null);

  const [items, setItems] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  // Clear filters on a new search
  useEffect(() => {
    setTags(null);
    setPrice(null);
  }, [searchTerm]);

  useEffect(() => {
    const callApi = async () => {
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://qualityco-backend.herokuapp.com"
          : "http://localhost:5000";

      const params = `page=${pageNumber}&pageSize=${pageSize}${
        searchTerm ? `&q=${searchTerm}` : ""
      }${
        tags && tags.length > 0 ? `&tags=[${tags.map((t) => `"${t}"`)}]` : ""
      }${
        price && price.length > 0
          ? `&price=[${price.map((p) => `"${p}"`)}]`
          : ""
      }`;
      const apiUrl = `${baseUrl}/api/${type ? type : ""}?${params}`;
      const pageUrl = `/search?type=${type ? type : ""}&${params}`;

      history.push(pageUrl);
      await fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setItems(data);
          setLoading(false);
        });
    };
    callApi();
  }, [searchTerm, type, tags, price, pageNumber, pageSize]);

  return (
    <SearchResultsWrapper>
      <SearchFilterBar>
        <FiltersButton onClick={() => setShowDrawer(true)}>
          Filters
        </FiltersButton>
        <SearchBar
          homePage={false}
          defaultValue={searchTerm}
          setLoading={setLoading}
          setSearchTerm={setSearchTerm}
          setType={setType}
          setPageNumber={setPageNumber}
        />
      </SearchFilterBar>

      <ResultsBody>
        <Filters
          tags={tags}
          setTags={setTags}
          price={price}
          setPrice={setPrice}
          setLoading={setLoading}
          setPageNumber={setPageNumber}
        />
        {/* For tablet and mobile */}
        <Drawer
          placement="left"
          visible={showDrawer}
          closable={false}
          onClose={() => setShowDrawer(false)}
        >
          <Filters
            tags={tags}
            setTags={setTags}
            price={price}
            setPrice={setPrice}
            visibleOverride={true}
            setLoading={setLoading}
            setPageNumber={setPageNumber}
          />
        </Drawer>

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
      </ResultsBody>
    </SearchResultsWrapper>
  );
};

export default SearchResults;
