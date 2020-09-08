import React from "react";
import {
  PromiseWrapper,
  PromiseCardDescription,
  PromiseTitle,
} from "../../styles/styles.js";

const PromiseCard = ({ icon, title, description }) => {
  return (
    <PromiseWrapper>
      {icon}
      <PromiseTitle>{title}</PromiseTitle>
      <PromiseCardDescription>{description}</PromiseCardDescription>
    </PromiseWrapper>
  );
};

export default PromiseCard;
