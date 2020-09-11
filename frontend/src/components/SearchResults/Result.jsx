import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";
import _ from "lodash";
import Tags from "./Tags.jsx";
import {
  ResultContainer,
  ResultImageLink,
  ResultHeader,
  ResultImage,
  ResultInfo,
  LinksAndTags,
  Tag,
  ShopNow,
  FadedBottom,
  Description,
} from "../../styles/styles.js";

const Result = ({
  company,
  website,
  tags,
  price,
  image,
  description,
  madeIn,
}) => {
  return (
    <ResultContainer>
      <ResultImageLink href={website} target="_blank" rel="noopener noreferrer">
        <ResultImage imageUrl={image} />
      </ResultImageLink>
      <ResultInfo>
        <ResultHeader>
          <h2>{company ? company : "-"}</h2>
          <div style={{ display: "flex" }}>
            {madeIn &&
              madeIn.map(({ location }, i) => (
                <Tag color="#f7946a" key={i}>
                  Made in {location}
                </Tag>
              ))}
            {price && <Tag color="#ff6e00">{price}</Tag>}
          </div>
        </ResultHeader>

        <Description>
          {description}
          <FadedBottom />
        </Description>

        <LinksAndTags>
          {website ? (
            <ShopNow>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline", marginRight: "5px" }}
              >
                Shop now
              </a>
              <ArrowRightOutlined />
            </ShopNow>
          ) : null}
          {tags && tags.length > 0 && <Tags tags={tags} company={company} />}
        </LinksAndTags>
      </ResultInfo>
    </ResultContainer>
  );
};

export default Result;
