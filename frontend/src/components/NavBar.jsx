import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TopBar,
  LogoContainer,
  Links,
  LinksInDrawer,
  MenuIcon,
  StarIcon,
} from "../styles/styles";
import { Drawer } from "antd";

const NavBar = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <TopBar>
      <MenuIcon onClick={() => setShowDrawer(true)} />

      <Drawer
        placement="left"
        closable={false}
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <LinksInDrawer>
          <Link to="/">Search</Link>
          <Link to="/">Brands</Link>
          <Link to="/">Services</Link>
          <Link to="/">Our Mission</Link>
        </LinksInDrawer>
      </Drawer>

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
