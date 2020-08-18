import React from "react";
import Result from "./Result.jsx";
import { ListOfResults } from "../../styles/styles.js";
import blank from "./blank.png";
import { Spin, Result as Notice } from "antd";
import { LoadingOutlined, CloseCircleOutlined } from "@ant-design/icons";

const ResultsList = ({ items, loading }) => {
  const spinIcon = (
    <LoadingOutlined style={{ fontSize: 60, marginTop: 60 }} spin />
  );
  return (
    <ListOfResults>
      {!loading ? (
        items.records.map((result, i) => {
          const { company, website, tags, image, description } = result;
          return (
            <Result
              key={i}
              company={company}
              website={website}
              tags={tags}
              image={image ? image : blank}
              description={description}
            />
          );
        })
      ) : (
        <Spin indicator={spinIcon} />
      )}
      {items && items.records && items.records.length === 0 && !loading ? (
        <Notice
          icon={<CloseCircleOutlined />}
          title="Sorry, we didn't find anything that matches your search."
        />
      ) : null}
    </ListOfResults>
  );
};

export default ResultsList;
