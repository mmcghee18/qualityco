import React from "react";
import { Link } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";
import { TopBar, LogoContainer, Links } from "../styles/styles";

const NavBar = () => {
  return (
    <TopBar>
      <Link to="/">
        <LogoContainer>
          <StarOutlined
            style={{ fontSize: "1.5em", color: "#5c6475", marginRight: "8px" }}
          />
          QualityCo
        </LogoContainer>
      </Link>

      <Links>
        <Link to="/">Search</Link>
        <Link to="/">Brands</Link>
        <Link to="/">Services</Link>
        <Link to="/">Our Mission</Link>
      </Links>
    </TopBar>
  );
};

export default NavBar;
