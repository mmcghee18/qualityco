import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Button, Tag as AntTag, Input } from "antd";
import { Link } from "react-router-dom";
import { StarOutlined, MenuOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Search } = Input;

const maxSizes = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "2560px",
};
const devices = {
  mobile: `(max-width: ${maxSizes.mobile})`,
  tablet: `(max-width: ${maxSizes.tablet})`,
  laptop: `(max-width: ${maxSizes.laptop})`,
  desktop: `(max-width: ${maxSizes.desktop})`,
};

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: Rubik, sans-serif;
    background-color: white;
    color: #5c6475;
  }

  h1 {
    color: inherit;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const TopBar = styled.div`
  position: sticky;
  background: white;
  z-index: 1000;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #5c6475;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  height: 70px;

  @media ${devices.tablet} {
    justify-content: center;
  }
`;

export const NavLink = styled(Link)`
  margin-left: 10px;
  margin-right: 10px;
`;

export const MenuIcon = styled(MenuOutlined)`
  display: none;

  @media ${devices.tablet} {
    position: absolute;
    left: 15px;
    font-size: 1.5em;
    display: block;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const StarIcon = styled(StarOutlined)`
  font-size: 1.5em;
  color: #5c6475;
  margin-right: 8px;
`;

export const LogoAndSearch = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media ${devices.tablet} {
    width: 100%;
    justify-content: center;
  }
`;

export const Links = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-weight: bold;

  @media ${devices.tablet} {
    margin-top: 15px;
    display: none;
  }
  @media ${devices.mobile} {
    font-size: 0.75em;
  }
`;

export const CollapsableSearch = styled(({ expandBar, ...otherProps }) => (
  <Search {...otherProps} />
))`
  width: 70%;
  transition: width 0.3s;

  @media ${devices.tablet} {
    width: ${(props) => (!props.expandBar ? "15%" : "70%")};
    position: ${(props) => (!props.expandBar ? "absolute" : "static")};
    right: 40px;
`;

export const LinksInDrawer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4em;
`;

export const SearchTitle = styled.h1`
  margin-bottom: 90px;
  text-align: center;
  color: #5c6475;
  font-weight: bold;

  @media ${devices.tablet} {
    font-size: 1.7em;
  }
  @media ${devices.mobile} {
    font-size: 1em;
    margin-bottom: 55px;
  }
`;

export const Logo = styled.img`
  height: 28px;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;

  @media ${devices.mobile} {
    margin-top: 100px;
  }
`;

export const SearchResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;

  @media ${devices.mobile} {
    padding: 20px;
  }
`;

export const FilterBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 75%;
  margin: 30px;

  @media ${devices.tablet} {
    display: none;
  }
`;

export const FilterBarButton = styled(Button)`
  color: ${(props) => (props.highlighted ? "#ff6e00" : null)};
  border-color: ${(props) => (props.highlighted ? "#ff6e00" : null)};
`;

export const FilterHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #5c6475;
`;

export const FilterPopup = styled.div`
  width: ${(props) => (props.overrideWidth ? null : "300px")};
  display: flex;
  flex-direction: column;
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const SwitchRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 3px;
`;

export const SwitchLabel = styled.div`
  margin-left: 7px;
`;

export const ListOfResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media ${devices.tablet} {
    padding-left: 0;
  }
`;

export const Suggestion = styled.span`
  font-weight: bold;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 30px;
  width: 100%;
  max-width: 1000px;
  height: 200px;
  position: relative;

  @media ${devices.laptop} {
    height: 150px;
  }
  @media ${devices.mobile} {
    position: static;
    height: auto;
    flex-direction: column;
    align-items: center;
  }
`;

export const ResultImageLink = styled.a`
  flex: 1;

  @media ${devices.mobile} {
    width: 100%;
  }
`;

export const ResultImage = styled.div`
  flex: 1;
  height: 100%;
  background-image: ${(props) => `url(${props.imageUrl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media ${devices.mobile} {
    width: 90%;
    height: 250px;
    flex: none;
  }
`;

export const ResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  flex: 2;
  margin-left: 30px;

  @media ${devices.laptop} {
    font-size: 0.8em;
  }
  @media ${devices.mobile} {
    margin-left: 0;
  }
`;

export const ResultHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Tags = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: flex-end;
  align-items: center;
  overflow: scroll;
`;

export const ShopNow = styled.div`
  flex-shrink: 0;
  width: 20%;
`;

export const LinksAndTags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 1em;
`;

export const Tag = styled(AntTag)`
  font-size: 1em;

  &:hover {
    cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
    background-color: ${(props) => (props.$clickable ? "darkgrey" : null)};
  }
`;

export const PopoverWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;

  @media ${devices.laptop} {
    font-size: 0.8em;
    width: 250px;
  }
`;

export const Description = styled.div`
  overflow: scroll;

  @media ${devices.mobile} {
    overflow: visible;
  }
`;

export const FadedBottom = styled.div`
  position: sticky;
  height: 30px;
  background: linear-gradient(
    to top,
    rgb(255 255 255) 0%,
    rgba(48, 47, 44, 0) 100%
  );
  bottom: 0;
  width: 100%;

  @media ${devices.laptop} {
    height: 15px;
  }
`;

export const FiltersButton = styled(Button)`
  display: none;

  @media ${devices.tablet} {
    display: flex;
  }
  @media ${devices.mobile} {
    height: 24px;
    padding: 0px 7px;
    font-size: 14px;
    border-radius: 2px;
  }
`;

export const SearchFilterBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
`;

export const CategoriesPopover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  max-height: 400px;
  flex-wrap: wrap;
  overflow: scroll;
`;

export const CategoryLabel = styled(Link)`
  margin: 10px;
`;

export const CategorySearchHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media ${devices.tablet} {
    justify-content: space-evenly;
    margin-bottom: 30px;
  }
`;

export const BrowseAllTitle = styled.h1`
  margin-bottom: 0px;
  margin-right: ${(props) => (props.noMargin ? "0px" : "50px")};
  text-align: center;

  @media ${devices.tablet} {
    margin-left: ${(props) => (props.noMargin ? "0px" : "20px")};
    margin-right: ${(props) => (props.noMargin ? "0px" : "20px")};
    font-size: 1.6em;
  }
  @media ${devices.mobile} {
    margin-left: ${(props) => (props.noMargin ? "0px" : "15px")};
    margin-right: ${(props) => (props.noMargin ? "0px" : "15px")};
    font-size: 1.2em;
  }
`;

export const CategoryDropdown = styled(Button)`
  @media ${devices.mobile} {
    height: 24px;
    padding: 0px 7px;
    font-size: 14px;
    border-radius: 2px;
  }
`;

export const LogoLink = styled(({ expandBar, ...otherProps }) => (
  <Link {...otherProps} />
))`
  margin-right: 20px;

  @media ${devices.tablet} {
    margin: 0px;
    display: ${(props) => (props.expandBar ? "none" : "flex")};
  }
`;

export const MissionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px;

  @media ${devices.tablet} {
    margin: 50px;
  }
`;

export const MissionTitle = styled.h1`
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 50px;
  width: 80%;

  @media ${devices.mobile} {
    font-size: 2em;
  }
`;

export const MissionDescription = styled.div`
  text-align: center;
  color: #a29e9e;
  font-size: 1.1em;
  margin-bottom: 200px;
  width: 70%;
`;

export const PromiseCards = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 100px;
  width: 100%;

  @media ${devices.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

export const PromiseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  margin: 20px;

  @media ${devices.tablet} {
    width: 100%;
  }
`;

export const PromiseTitle = styled.h1`
  @media ${devices.mobile} {
    font-size: 1.6em;
  }
`;

export const PromiseIcon = styled(FontAwesomeIcon)`
  font-size: 3.5em;
  margin-bottom: 25px;
  margin-right: 0px !important;
  color: #ff6e00;
`;

export const PromiseCardDescription = styled.div`
  text-align: center;
  color: #a29e9e;
  width: 70%;
`;
