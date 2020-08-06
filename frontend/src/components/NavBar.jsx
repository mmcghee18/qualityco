import React from "react";
import { Link } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";
import { TopBar, LogoContainer } from "../styles/styles";

const NavBar = () => {
  return (
    <TopBar>
      <LogoContainer>
        <StarOutlined
          style={{ fontSize: "1.5em", color: "#5c6475", marginRight: "8px" }}
        />
        <div>QualityCo</div>
      </LogoContainer>

      <Link to="/">Search</Link>
      <Link to="/">Brands</Link>
      <Link to="/">Services</Link>
      <Link to="/our-mission">Our Mission</Link>
    </TopBar>
  );
};

export default NavBar;
