import React, { useEffect, useState } from "react";
import Result from "./Result.jsx";
import { Column } from "../../styles/styles.js";
import michelle from "./michelle.png";
import pudding from "./pudding.png";

const ResultsList = ({ data }) => {
  console.log(data);
  return (
    <Column alignItems="center" style={{ flexGrow: 1, width: "100%" }}>
      {data.records.map((result, i) => {
        const { company, website, tags, image, description } = result;
        return (
          <Result
            company={company}
            website={website}
            tags={tags}
            image={i === 0 ? pudding : michelle}
            description={description}
          />
        );
      })}
    </Column>
  );
};

export default ResultsList;
