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
import { Drawer, Popover } from "antd";

const NavBar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const location = useLocation();

  const productsPopoverContent = <div>hi</div>;

  return (
    <TopBar>
      <MenuIcon onClick={() => setShowDrawer(true)} />

      <Link to="/">
        <Logo src={logo} />
      </Link>

      <Links>
        <Link to="/">Search</Link>
        <Popover content={productsPopoverContent}>
          <Link
            to="/search?type=products"
            onClick={(e) => {
              // block redirect if already there
              const params = queryString.parse(location.search);
              if (params.type === "products") e.preventDefault();
            }}
          >
            Products
          </Link>
        </Popover>
        <Link
          to="/search?type=services"
          onClick={(e) => {
            // block redirect if already there
            const params = queryString.parse(location.search);
            if (params.type === "services") e.preventDefault();
          }}
        >
          Services
        </Link>
        <Link to="/">Our Mission</Link>
      </Links>

      {/* The version of the nav bar for tablet/mobile */}
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
    </TopBar>
  );
};

export default NavBar;
