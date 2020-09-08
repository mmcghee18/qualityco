import React from "react";
import { Popover } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import _ from "lodash";
import {
  ResultContainer,
  ResultImageLink,
  ResultHeader,
  ResultImage,
  ResultInfo,
  Tags,
  LinksAndTags,
  Tag,
  ShopNow,
  FadedBottom,
  Description,
  PopoverWrapper,
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
  const popoverContent = tags ? (
    <PopoverWrapper>
      {tags.map(({ tag }, i) => (
        <Tag key={`popover-${i}`}>{tag}</Tag>
      ))}
    </PopoverWrapper>
  ) : null;
  const goodLengthTags = tags
    ? _.filter(tags, ({ tag }) => tag.length < 30)
    : null;

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
          {tags ? (
            <Tags>
              {/* Max 2 tags */}
              {goodLengthTags &&
                _.take(goodLengthTags, 2).map(({ tag }, i) => (
                  <Tag key={i}>{tag}</Tag>
                ))}
              {/* Elipsis if there are more tags to see */}
              {tags.length > 2 || goodLengthTags.length < tags.length ? (
                <Popover content={popoverContent} placement="bottom">
                  <Tag $clickable={true}>...</Tag>
                </Popover>
              ) : null}
            </Tags>
          ) : null}
        </LinksAndTags>
      </ResultInfo>
    </ResultContainer>
  );
};

export default Result;
