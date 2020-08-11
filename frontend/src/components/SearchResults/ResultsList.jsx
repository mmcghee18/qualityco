import React, { useEffect, useState } from "react";
import Result from "./Result.jsx";
import { Column } from "../../styles/styles.js";

const ResultsList = ({ data }) => {
  console.log(data);
  return (
    <Column>
      {data.records.map((result) => {
        const { company, website, tags, image, description } = result;
        return (
          <Result
            company={company}
            website={website}
            tags={tags}
            image={image}
            description={description}
          />
        );
      })}
    </Column>
  );
};

export default ResultsList;
