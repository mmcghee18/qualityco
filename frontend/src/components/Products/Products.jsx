import React, { useEffect, useState } from "react";
import queryString from "query-string";
import {
  SearchResultsWrapper,
  CategorySearchHeader,
  FiltersButton,
  BrowseAllTitle,
  CategoryDropdown,
} from "../../styles/styles.js";
import { Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FilterBar from "../SearchResults/Filters/FilterBar.jsx";
import ResultsList from "../SearchResults/ResultsList.jsx";

let abortController = new AbortController();

const Products = ({ location, history }) => {
  const queryParams = queryString.parse(location.search);
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState([]);
  const [places, setPlaces] = useState([]);
  const [stages, setStages] = useState([]);
  const [category, setCategory] = useState(
    queryParams.category ? queryParams.category : null
  );

  const [items, setItems] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState([]);

  // If we get redirected here from <NavBar/>, handle those updates
  useEffect(() => {
    setPageNumber(1);
    setCategory(queryParams.category);
    setLoading(true);
  }, [queryParams.category]);

  useEffect(() => {
    const callApi = async () => {
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://qualityco-backend.herokuapp.com"
          : "http://localhost:5000";
      const apiUrl = `${baseUrl}/api/categories`;

      await fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setCategoryOptions(data.categories.map((c) => c.category));
        });
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

      const params = queryString.stringify({
        page: pageNumber,
        pageSize,
        tags: tags.map((t) => t.tag),
        price,
        companyHQ:
          places.length > 0 && stages.includes("companyHQ") ? places : [],
        designed:
          places.length > 0 && stages.includes("designed") ? places : [],
        manufactured:
          places.length > 0 && stages.includes("manufactured") ? places : [],
        warehoused:
          places.length > 0 && stages.includes("warehoused") ? places : [],
        category,
      });

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
              {categoryOptions.map((option, i) => (
                <Menu.Item
                  key={i}
                  onClick={() => {
                    setPageNumber(1);
                    setCategory(option);
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

export default Products;
