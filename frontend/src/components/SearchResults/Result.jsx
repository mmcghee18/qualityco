import React, { useEffect, useState } from "react";
import { Popover } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import _ from "lodash";
import {
  ResultContainer,
  ResultImage,
  ResultInfo,
  Tags,
  LinksAndTags,
  Tag,
  FadedBottom,
  Description,
  PopoverWrapper,
} from "../../styles/styles.js";

const Result = ({ company, website, tags, image, description }) => {
  const popoverContent = (
    <PopoverWrapper>
      {tags.map((tag) => (
        <Tag>{tag}</Tag>
      ))}
    </PopoverWrapper>
  );
  const goodLengthTags = tags.filter((tag) => tag.length < 30);

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
          <div style={{ flexShrink: 0, width: "20%" }}>
            <a
              href={website}
              target="_blank"
              style={{ textDecoration: "underline", marginRight: "5px" }}
            >
              Shop now
            </a>
            <ArrowRightOutlined />
          </div>
          <Tags>
            {/* Max 2 tags */}
            {_.take(goodLengthTags, 2).map((tag) => (
              <Tag>{tag}</Tag>
            ))}
            {/* Elipsis if there are more tags to see */}
            {tags.length > 2 || goodLengthTags.length < tags.length ? (
              <Popover content={popoverContent} placement="bottom">
                <Tag clickable={true}>...</Tag>
              </Popover>
            ) : null}
          </Tags>
        </LinksAndTags>
      </ResultInfo>
    </ResultContainer>
  );
};

export default Result;
