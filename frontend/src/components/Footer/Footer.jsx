import React from "react";
import { FooterWrapper, FooterInputs } from "../../styles/styles.js";
import { Input, Button } from "antd";

const Footer = () => {
  return (
    <FooterWrapper>
      <h1>Submit a brand</h1>
      <p>Have a favorite brand we should know about? Tell us here!</p>
      <FooterInputs>
        <Input
          placeholder="Company name"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        />
        <Input
          placeholder="Company website"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        />
        <Button style={{ marginLeft: "10px", marginRight: "10px" }}>
          Submit
        </Button>
      </FooterInputs>
    </FooterWrapper>
  );
};

export default Footer;
