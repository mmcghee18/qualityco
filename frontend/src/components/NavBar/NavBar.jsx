import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CollapsableSearchBar from "./CollapsableSearchBar.jsx";
import {
  TopBar,
  NavLink,
  LogoAndSearch,
  Logo,
  Links,
  LinksInDrawer,
  LogoLink,
  MenuIcon,
  CategoriesPopover,
  CategoryLabel,
} from "../../styles/styles";
import logo from "../../logos/full-logo.png";
import { Drawer, Popover } from "antd";

const NavBar = ({
  searchTerm,
  setSearchTerm,
  type,
  setType,
  setCategory,
  setLoading,
}) => {
  const [productCategories, setProductCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [expandBar, setExpandBar] = useState(false);

  const productsPopoverContent = productCategories && (
    <CategoriesPopover>
      {productCategories.map((category) => (
        <CategoryLabel
          key={category}
          to="/products"
          onClick={() => {
            setLoading(true);
            setCategory(category);
          }}
        >
          {category}
        </CategoryLabel>
      ))}
    </CategoriesPopover>
  );
  const servicesPopoverContent = serviceCategories && (
    <CategoriesPopover>
      {serviceCategories.map((category) => (
        <CategoryLabel
          key={category}
          to="/services"
          onClick={() => {
            setLoading(true);
            setCategory(category);
          }}
        >
          {category}
        </CategoryLabel>
      ))}
    </CategoriesPopover>
  );

  useEffect(() => {
    const callApi = async () => {
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://qualityco-backend.herokuapp.com"
          : "http://localhost:5000";
      const productCategoriesUrl = `${baseUrl}/api/productCategories`;
      const serviceCategoriesUrl = `${baseUrl}/api/serviceCategories`;

      try {
        let productResponse = await fetch(productCategoriesUrl);
        productResponse = await productResponse.json();
        setProductCategories(productResponse.categories.map((c) => c.category));
        let serviceResponse = await fetch(serviceCategoriesUrl);
        serviceResponse = await serviceResponse.json();
        setServiceCategories(serviceResponse.categories.map((c) => c.category));
      } catch (err) {
        console.error(err);
      }
    };
    callApi();
  }, []);

  return (
    <TopBar>
      <LogoAndSearch>
        <MenuIcon onClick={() => setShowDrawer(true)} />

        <LogoLink
          to="/"
          onClick={() => {
            setType("products");
            setCategory(null);
            setSearchTerm(null);
          }}
          expandBar={expandBar}
        >
          <Logo src={logo} />
        </LogoLink>
        <CollapsableSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          type={type}
          setType={setType}
          setLoading={setLoading}
          expandBar={expandBar}
          setExpandBar={setExpandBar}
        />
      </LogoAndSearch>

      <Links>
        <Popover content={productsPopoverContent}>
          <NavLink
            to="/products"
            onClick={() => {
              setLoading(true);
              setCategory(null);
            }}
          >
            Products
          </NavLink>
        </Popover>
        <Popover content={servicesPopoverContent}>
          <NavLink
            to="/services"
            onClick={() => {
              setLoading(true);
              setCategory(null);
            }}
          >
            Services
          </NavLink>
        </Popover>

        <NavLink to="/mission" onClick={() => setLoading(false)}>
          Our Mission
        </NavLink>
      </Links>

      {/* The version of the nav bar for tablet/mobile */}
      <Drawer
        placement="left"
        closable={false}
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <LinksInDrawer>
          <Link
            to="/"
            onClick={() => {
              setShowDrawer(false);
              setLoading(true);
            }}
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => {
              setCategory(null);
              setShowDrawer(false);
              setLoading(true);
            }}
          >
            Products
          </Link>
          <Link
            to="/services"
            onClick={() => {
              setCategory(null);
              setShowDrawer(false);
              setLoading(true);
            }}
          >
            Services
          </Link>
          <Link
            to="/mission"
            onClick={() => {
              setShowDrawer(false);
              setLoading(false);
            }}
          >
            Our Mission
          </Link>
        </LinksInDrawer>
      </Drawer>
    </TopBar>
  );
};

export default NavBar;
