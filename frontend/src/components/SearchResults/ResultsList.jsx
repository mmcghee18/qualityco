import React, { useEffect, useState } from "react";
import Result from "./Result.jsx";
import { ListOfResults } from "../../styles/styles.js";
import michelle from "./michelle.png";
import pudding from "./pudding.png";

const ResultsList = ({ data }) => {
  return (
    <ListOfResults>
      {data.records.map((result, i) => {
        const { company, website, tags, image, description } = result;
        return (
          <Result
            key={i}
            company={company}
            website={website}
            tags={tags}
            image={i === 0 ? pudding : michelle}
            description={description}
          />
        );
      })}
    </ListOfResults>
  );
};

export default ResultsList;
