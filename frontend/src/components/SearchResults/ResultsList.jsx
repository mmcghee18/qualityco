import React from "react";
import Result from "./Result.jsx";
import { ListOfResults, Suggestion } from "../../styles/styles.js";
import blank from "./blank.png";
import { Spin, Pagination, Result as Notice } from "antd";
import { LoadingOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./ResultsList.css";

const ResultsList = ({
  items,
  loading,
  setLoading,
  setSearchTerm,
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
}) => {
  const pageChange = (page) => {
    setPageNumber(page);
    setLoading(true);
  };
  const pageSizeChange = (current, size) => {
    setPageSize(size);
    setLoading(true);
  };

  const spinIcon = (
    <LoadingOutlined style={{ fontSize: 60, marginTop: 60 }} spin />
  );
  return (
    <ListOfResults>
      {items && items.records && items.records.length > 0 && !loading ? (
        <>
          {items.records.map((result, i) => {
            const { company, name, website, tags, price, description } = result;
            const image = result.images ? result.images[0].url : blank;
            return (
              <Result
                key={i}
                company={company ? company : name}
                website={website}
                tags={tags}
                price={price}
                image={image}
                description={description}
                madeIn={result["made in"]}
              />
            );
          })}
          {items.records.length > 0 && (
            <Pagination
              defaultCurrent={pageNumber}
              pageSize={pageSize}
              total={items.totalNumberOfRecords}
              onChange={pageChange}
              onShowSizeChange={pageSizeChange}
              style={{ marginTop: "40px" }}
            />
          )}
        </>
      ) : (
        <Spin indicator={spinIcon} />
      )}
      {items && items.records && items.records.length === 0 && !loading ? (
        <>
          <Notice
            icon={<CloseCircleOutlined />}
            title="Sorry, we didn't find anything that matches your search."
          />
          {items.spellingSuggestions && items.spellingSuggestions.length > 0 && (
            <div>
              Did you mean{" "}
              <Suggestion
                onClick={() => {
                  setSearchTerm(items.spellingSuggestions[0]);
                  setLoading(true);
                  setPageNumber(1);
                }}
              >
                {items.spellingSuggestions[0]}
              </Suggestion>
              ?
            </div>
          )}
        </>
      ) : null}
    </ListOfResults>
  );
};

export default ResultsList;
