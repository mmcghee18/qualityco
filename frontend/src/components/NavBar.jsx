import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import queryString from "query-string";
import { Link } from "react-router-dom";
import {
  TopBar,
  Logo,
  Links,
  LinksInDrawer,
  MenuIcon,
  ProductsPopover,
  CategoryLabel,
} from "../styles/styles";
import logo from "../logos/rectangle-transparent.png";
import { Drawer, Popover } from "antd";

const NavBar = () => {
  const [productCategories, setProductCategories] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [redirectCategory, setRedirectCategory] = useState(null);

  const productsPopoverContent = productCategories && (
    <ProductsPopover>
      {productCategories.map(({ category }) => (
        <CategoryLabel
          key={category}
          onClick={() => {
            setRedirectCategory(category);
          }}
        >
          {category}
        </CategoryLabel>
      ))}
    </ProductsPopover>
  );

  useEffect(() => {
    const callApi = async () => {
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://qualityco-backend.herokuapp.com"
          : "http://localhost:5000";
      const apiUrl = `${baseUrl}/api/categories`;

      await fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setProductCategories(data.categories);
        });
    };
    callApi();
  }, []);

  return (
    <TopBar>
      {/* Redirect to products page with a category */}
      {redirectCategory && (
        <Redirect
          to={`/products?${queryString.stringify({
            category: redirectCategory,
          })}`}
        />
      )}

      <MenuIcon onClick={() => setShowDrawer(true)} />

      <Link to="/">
        <Logo src={logo} />
      </Link>

      <Links>
        <Link to="/">Search</Link>
        <Popover content={productsPopoverContent}>
          <Link to="/products">Products</Link>
        </Popover>
        <Link to="/services">Services</Link>
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
          <Link to="/products">Products</Link>
          <Link to="/services">Services</Link>
          <Link to="/">Our Mission</Link>
        </LinksInDrawer>
      </Drawer>
    </TopBar>
  );
};

export default NavBar;
