import React, { useState } from "react";
import queryString from "query-string";
import { Link, useLocation } from "react-router-dom";
import {
  TopBar,
  Logo,
  Links,
  LinksInDrawer,
  MenuIcon,
  StarIcon,
} from "../styles/styles";
import logo from "../logos/rectangle-transparent.png";
import { Drawer } from "antd";

const NavBar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const location = useLocation();

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
          <Link to="/search?type=products">Products</Link>
          <Link to="/search?type=services">Services</Link>
          <Link to="/">Our Mission</Link>
        </LinksInDrawer>
      </Drawer>

      <Link to="/">
        <Logo src={logo} />
      </Link>

      <Links>
        <Link to="/">Search</Link>
        <Link
          to="/search?type=products"
          onClick={(e) => {
            const params = queryString.parse(location.search);
            if (params.type === "products") e.preventDefault();
          }}
        >
          Products
        </Link>
        <Link
          to="/search?type=services"
          onClick={(e) => {
            const params = queryString.parse(location.search);
            if (params.type === "services") e.preventDefault();
          }}
        >
          Services
        </Link>
        <Link to="/">Our Mission</Link>
      </Links>
    </TopBar>
  );
};

export default NavBar;
