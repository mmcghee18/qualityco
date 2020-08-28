import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import {
  TopBar,
  NavLink,
  LogoAndSearch,
  Logo,
  Links,
  LinksInDrawer,
  LogoLink,
  MenuIcon,
  ProductsPopover,
  CategoryLabel,
} from "../../styles/styles";
import logo from "../../logos/rectangle-transparent.png";
import { Drawer, Popover } from "antd";

const NavBar = ({
  searchTerm,
  setSearchTerm,
  setType,
  setCategory,
  setLoading,
}) => {
  const [productCategories, setProductCategories] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [expandBar, setExpandBar] = useState(false);

  const productsPopoverContent = productCategories && (
    <ProductsPopover>
      {productCategories.map(({ category }) => (
        <CategoryLabel
          key={category}
          onClick={() => {
            console.log("new category", category);
            setLoading(true);
            setCategory(category);
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
      <LogoAndSearch>
        <MenuIcon onClick={() => setShowDrawer(true)} />

        <LogoLink
          to="/"
          onClick={() => setSearchTerm(null)}
          expandBar={expandBar}
        >
          <Logo src={logo} />
        </LogoLink>
        <SearchBar
          navBar={true}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setType={setType}
          setLoading={setLoading}
          expandBar={expandBar}
          setExpandBar={setExpandBar}
        />
      </LogoAndSearch>

      <Links>
        <Popover content={productsPopoverContent}>
          <NavLink to="/products">Products</NavLink>
        </Popover>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/">Our Mission</NavLink>
      </Links>

      {/* The version of the nav bar for tablet/mobile */}
      <Drawer
        placement="left"
        closable={false}
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <LinksInDrawer>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/services">Services</Link>
          <Link to="/">Our Mission</Link>
        </LinksInDrawer>
      </Drawer>
    </TopBar>
  );
};

export default NavBar;
