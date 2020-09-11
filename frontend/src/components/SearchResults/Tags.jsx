import React, { useState, useEffect, useCallback } from "react";
import { Popover } from "antd";
import ResultTag from "./ResultTag.jsx";
import { Tag, TagsWrapper, PopoverWrapper } from "../../styles/styles.js";
import useChartDimensions from "../../hooks/useChartDimensions.js";
import _ from "lodash";

const Tags = ({ company, tags }) => {
  const popoverContent = tags ? (
    <PopoverWrapper>
      {tags.map(({ tag }, i) => (
        <Tag key={`popover-${i}`} visible={true}>
          {tag}
        </Tag>
      ))}
    </PopoverWrapper>
  ) : null;

  const [ref, dms] = useChartDimensions({});
  const [tagWidths, setTagWidths] = useState(Array(tags.length).fill(0));
  const [numTagsVisible, setNumTagsVisible] = useState(0);
  const [ellipsisWidth, setEllipsisWidth] = useState(0);

  const ellipsisRef = useCallback((node) => {
    if (node !== null) {
      setEllipsisWidth(node.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    if (
      _.every(tagWidths, (tagWidth) => tagWidth !== 0) &&
      dms.width > 0 &&
      ellipsisWidth > 0
    ) {
      let remainingSpace = dms.width - ellipsisWidth - 50; // hacky: added 50px buffer becuase for some reason it was still overflowing...
      let i = 0;
      while (remainingSpace >= tagWidths[i]) {
        remainingSpace = remainingSpace - tagWidths[i];
        i++;
      }
      setNumTagsVisible(i);
    }
  }, [tagWidths, dms.width, ellipsisWidth]);

  return (
    <>
      {tags && (
        <TagsWrapper ref={ref}>
          {tags.map(({ tag }, i) => (
            <ResultTag
              contents={tag}
              key={i}
              visible={numTagsVisible === 0 ? true : i < numTagsVisible}
              i={i}
              setTagWidths={setTagWidths}
            />
          ))}
          {tags.length > numTagsVisible && (
            <Popover content={popoverContent} placement="bottom">
              <Tag $clickable={true} visible={true} ref={ellipsisRef}>
                ...
              </Tag>
            </Popover>
          )}
        </TagsWrapper>
      )}
    </>
  );
};

export default Tags;

// {tags ? (
//   <Tags>
//     {/* Max 2 tags */}
//     {goodLengthTags &&
//       _.take(goodLengthTags, 2).map(({ tag }, i) => (
//         <Tag key={i}>{tag}</Tag>
//       ))}
//     {/* Elipsis if there are more tags to see */}
//     {tags.length > 2 || goodLengthTags.length < tags.length ? (
//       <Popover content={popoverContent} placement="bottom">
//         <Tag $clickable={true}>...</Tag>
//       </Popover>
//     ) : null}
//   </Tags>
// ) : null}
