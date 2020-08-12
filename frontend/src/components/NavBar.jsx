import React from "react";
import { Link } from "react-router-dom";
import {
  TopBar,
  LogoContainer,
  Links,
  MenuIcon,
  StarIcon,
} from "../styles/styles";

const NavBar = () => {
  return (
    <TopBar>
      <MenuIcon />

      <Link to="/">
        <LogoContainer>
          <StarIcon />
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
