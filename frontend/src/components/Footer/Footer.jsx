import React, { useState } from "react";
import queryString from "query-string";
import {
  FooterTitle,
  FooterInputs,
  FooterInput,
  FooterSubmit,
} from "../../styles/styles.js";
import { message, Drawer } from "antd";

const Footer = ({ drawerVisible, setDrawerVisible }) => {
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

      setDrawerVisible(false);
      setCompanyName("");
      setCompanyWebsite("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Drawer
      title={null}
      placement="bottom"
      closable={false}
      onClose={() => setDrawerVisible(false)}
      visible={drawerVisible}
      drawerStyle={{ background: "rgb(255, 110, 0, 0.5)" }}
    >
      <div>
        <FooterTitle>Submit a brand</FooterTitle>
        <p>Have a favorite brand we should know about? Tell us here!</p>
        <FooterInputs>
          <FooterInput
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <FooterInput
            placeholder="Company website"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
          />
          <FooterSubmit
            onClick={submitSuggestion}
            disabled={!companyName || !companyWebsite}
          >
            Submit
          </FooterSubmit>
        </FooterInputs>
      </div>
    </Drawer>
  );
};

export default Footer;
