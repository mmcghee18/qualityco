import React, { useEffect, useState } from "react";
import Result from "./Result.jsx";
import { ListOfResults } from "../../styles/styles.js";
import blank from "./blank.png";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ResultsList = ({ items }) => {
  const spinIcon = (
    <LoadingOutlined style={{ fontSize: 60, marginTop: 60 }} spin />
  );
  return (
    <ListOfResults>
      {items ? (
        items.records.map((result, i) => {
          const { company, website, tags, image, description } = result;
          return (
            <Result
              key={i}
              company={company}
              website={website}
              tags={tags}
              image={blank}
              description={description}
            />
          );
        })
      ) : (
        <Spin indicator={spinIcon} />
      )}
    </ListOfResults>
  );
};

export default ResultsList;
