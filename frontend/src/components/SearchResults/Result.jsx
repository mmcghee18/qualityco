import React from "react";
import { Popover } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import _ from "lodash";
import {
  ResultContainer,
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
  const goodLengthTags = _.filter(tags, ({ tag }) => tag.length < 30);

  return (
    <ResultContainer>
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        style={{ flex: 1 }}
      >
        <ResultImage imageUrl={image} />
      </a>
      <ResultInfo>
        <ResultHeader>
          <h2>{company ? company : "-"}</h2>
          <div style={{ display: "flex" }}>
            {madeIn &&
              madeIn.map((place) => <Tag color="#f7946a">Made in {place}</Tag>)}
            {price && <Tag color="#E65213">{price}</Tag>}
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
              {_.take(goodLengthTags, 2).map(({ tag }, i) => (
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
