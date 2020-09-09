import React, { useState } from "react";
import queryString from "query-string";
import { FooterWrapper, FooterInputs } from "../../styles/styles.js";
import { message, Input, Button } from "antd";

const Footer = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  const submitSuggestion = async () => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://qualityco-backend.herokuapp.com"
        : "http://localhost:5000";
    const params = queryString.stringify({
      name: companyName,
      website: companyWebsite,
    });
    const apiUrl = `${baseUrl}/api/suggestBrand?${params}`;

    try {
      let response = await fetch(apiUrl);
      response = await response.json();

      if (response.success) {
        message.success({
          content:
            "Thanks for sharing this brand. We'll be sure to check it out!",
          style: {
            marginTop: "70vh",
          },
        });
      } else {
        message.error({
          content: "There was a problem. Try submitting again.",
          style: {
            marginTop: "70vh",
          },
        });
      }

      setCompanyName("");
      setCompanyWebsite("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FooterWrapper>
      <h1>Submit a brand</h1>
      <p>Have a favorite brand we should know about? Tell us here!</p>
      <FooterInputs>
        <Input
          placeholder="Company name"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <Input
          placeholder="Company website"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
        />
        <Button
          style={{ marginLeft: "10px", marginRight: "10px" }}
          onClick={submitSuggestion}
          disabled={!companyName || !companyWebsite}
        >
          Submit
        </Button>
      </FooterInputs>
    </FooterWrapper>
  );
};

export default Footer;
