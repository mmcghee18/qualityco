import React from "react";
import Result from "./Result.jsx";
import { ListOfResults, Suggestion } from "../../styles/styles.js";
import blank from "./blank.png";
import { Spin, Result as Notice } from "antd";
import { LoadingOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./ResultsList.css";

const ResultsList = ({ items, loading, setSearchTerm }) => {
  const spinIcon = (
    <LoadingOutlined style={{ fontSize: 60, marginTop: 60 }} spin />
  );
  return (
    <ListOfResults>
      {!loading ? (
        items.records.map((result, i) => {
          const { company, website, tags, price, image, description } = result;
          return (
            <Result
              key={i}
              company={company}
              website={website}
              tags={tags}
              price={price}
              image={image ? image : blank}
              description={description}
            />
          );
        })
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
                onClick={() => setSearchTerm(items.spellingSuggestions[0])}
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
