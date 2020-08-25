import React from "react";
import { FilterPopup } from "../../../styles/styles.js";
import { Checkbox } from "antd";

const Price = ({
  price,
  priceOptions,
  setPageNumber,
  setPrice,
  setLoading,
}) => {
  return (
    <FilterPopup>
      <Checkbox.Group
        value={price}
        options={priceOptions}
        onChange={(checkedValues) => {
          setPageNumber(1);
          setPrice(checkedValues);
          setLoading(true);
        }}
      ></Checkbox.Group>
    </FilterPopup>
  );
};

export default Price;
