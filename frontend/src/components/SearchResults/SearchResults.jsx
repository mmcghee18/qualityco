import React, { useState } from "react";
import queryString from "query-string";
import SearchBar from "../Search/SearchBar.jsx";
import { Column, ResultsBody, FiltersButton } from "../../styles/styles.js";
import Filters from "./Filters.jsx";
import ResultsList from "./ResultsList.jsx";
import fakeData from "./fakeData.js";
import { Drawer } from "antd";

const SearchResults = ({ location }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const queryParams = queryString.parse(location.search);
  console.log(queryParams);

  // Get the data from the API
  // For now, fake data

  return (
    <Column alignItems="center" padding="40px">
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <FiltersButton onClick={() => setShowDrawer(true)}>
          Show Filters
        </FiltersButton>
        <SearchBar defaultValue={queryParams.q} />
      </div>

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

        <ResultsList data={fakeData} />
      </ResultsBody>
    </Column>
  );
};

export default SearchResults;
