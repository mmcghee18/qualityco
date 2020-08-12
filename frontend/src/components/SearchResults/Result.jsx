import React, { useEffect, useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import {
  ResultContainer,
  ResultImage,
  ResultInfo,
  Row,
  LinksAndTags,
  Tag,
  FadedBottom,
  Description,
} from "../../styles/styles.js";

const Result = ({ company, website, tags, image, description }) => {
  return (
    <ResultContainer>
      <ResultImage src={image} alt="test" />
      <ResultInfo>
        <h2>{company}</h2>
        <Description>
          {description}
          <FadedBottom />
        </Description>

        <LinksAndTags>
          <div style={{ flexShrink: 0 }}>
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
        </LinksAndTags>
      </ResultInfo>
    </ResultContainer>
  );
};

export default Result;
