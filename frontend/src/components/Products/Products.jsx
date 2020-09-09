import React, { useEffect, useState } from "react";
import queryString from "query-string";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import {
  SearchResultsWrapper,
  CategorySearchHeader,
  FiltersButton,
  BrowseAllTitle,
  CategoryDropdown,
} from "../../styles/styles.js";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FilterBar from "../SearchResults/Filters/FilterBar.jsx";
import ResultsList from "../SearchResults/ResultsList.jsx";

let abortController = new AbortController();

const Products = ({ history, category, setCategory, loading, setLoading }) => {
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState([]);
  const [places, setPlaces] = useState([]);
  const [stages, setStages] = useState([]);

  const [items, setItems] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [categoryOptions, setCategoryOptions] = useState([]);

  // On category switch
  useEffect(() => {
    setPageNumber(1);
  }, [category]);

  // Get category options
  useEffect(() => {
    const callApi = async () => {
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://qualityco-backend.herokuapp.com"
          : "http://localhost:5000";
      const apiUrl = `${baseUrl}/api/productCategories`;

      try {
        let response = await fetch(apiUrl);
        response = await response.json();
        setCategoryOptions(response.categories.map((c) => c.category));
      } catch (err) {
        console.error(err);
      }
    };
    callApi();
  }, []);

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
            tags: JSON.stringify(tags),
            price,
            designedIn:
              places.length > 0 && stages.includes("designedIn") ? places : [],
            madeIn:
              places.length > 0 && stages.includes("madeIn") ? places : [],
            category,
          },
          (value, key) => value
        )
      );

      const apiUrl = `${baseUrl}/api/products?${params}`;
      const pageUrl = `/products?${params}`;
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
  }, [tags, price, pageNumber, pageSize, places, stages, category]);

  return (
    <SearchResultsWrapper>
      <CategorySearchHeader>
        <FiltersButton onClick={() => setShowDrawer(true)}>
          Filters
        </FiltersButton>
        <BrowseAllTitle>Browse All Products</BrowseAllTitle>
        <Dropdown
          overlay={
            <Menu>
              {["All categories", ...categoryOptions].map((option, i) => (
                <Menu.Item
                  key={i}
                  onClick={() => {
                    setPageNumber(1);
                    if (option === "All categories") setCategory(null);
                    else setCategory(option);
                    setLoading(true);
                  }}
                >
                  {option}
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <CategoryDropdown>
            {category ? category : "Choose Category"} <DownOutlined />
          </CategoryDropdown>
        </Dropdown>
      </CategorySearchHeader>
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
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </SearchResultsWrapper>
  );
};

export default withRouter(Products);
