import React, { useEffect, useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import {
  ResultContainer,
  ResultImage,
  ResultInfo,
  Row,
  Tag,
} from "../../styles/styles.js";
import sampleImage from "./sampleImage.jpg";

const Result = ({ company, website, tags, image, description }) => {
  return (
    <ResultContainer>
      <ResultImage src={sampleImage} alt="test" />
      <ResultInfo>
        <div style={{ overflow: "scroll" }}>
          <h2>{company}</h2>
          <div>{description}</div>
        </div>

        <Row justifyContent="space-between" marginTop="10px">
          <div>
            <a
              href={website}
              target="_blank"
              style={{ textDecoration: "underline", marginRight: "5px" }}
            >
              Shop now
            </a>
            <ArrowRightOutlined />
          </div>
          <Row>
            {tags.map((tag) => (
              <Tag>{tag}</Tag>
            ))}
          </Row>
        </Row>
      </ResultInfo>
    </ResultContainer>
  );
};

export default Result;
