import React, { useCallback } from "react";
import { Tag } from "../../styles/styles.js";

const ResultTag = ({ contents, visible, i, setTagWidths }) => {
  // This gets called once the ref is attached to the DOM node
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const myWidth = node.getBoundingClientRect().width;
      setTagWidths((prevTagWidths) => {
        const updatedTagWidths = [
          ...prevTagWidths.slice(0, i),
          myWidth,
          ...prevTagWidths.slice(i + 1),
        ];
        return updatedTagWidths;
      });
    }
  }, []);

  return (
    <Tag ref={measuredRef} visible={visible}>
      {contents}
    </Tag>
  );
};

export default ResultTag;
