import styled, { createGlobalStyle } from "styled-components";
import { Button } from "antd";
import { StarOutlined, MenuOutlined } from "@ant-design/icons";

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
  padding-left: 10px;

  @media ${devices.tablet} {
    justify-content: center;
  }
`;

export const MenuIcon = styled(MenuOutlined)`
  display: none;

  @media ${devices.tablet} {
    display: block;
    position: absolute;
    left: 20px;
    font-size: 1.5em;

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

export const Links = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.4em;
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

export const ResultsBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-self: flex-start;
  margin-top: 30px;
`;

export const FiltersWrapper = styled.div`
  display: ${(props) => (props.visibleOverride ? "block !important" : "block")};
  width: 200px;
  position: absolute;

  @media ${devices.tablet} {
    display: none;
  }
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
`;

export const SwitchLabel = styled.div`
  margin-left: 7px;
`;

export const ListOfResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 200px;
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
  margin: 20px;
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
  }
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

export const ResultImage = styled.img`
  position: absolute;
  height: 100%;
  width: auto;

  @media ${devices.mobile} {
    position: static;
    width: 100%;
    height: auto;
  }
`;

export const ResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  margin-left: 20px;
  padding-left: 300px;

  @media ${devices.laptop} {
    font-size: 0.8em;
    padding-left: 230px;
  }
  @media ${devices.mobile} {
    margin-left: 0;
    padding-left: 0;
  }
`;

export const Tag = styled.div`
  height: 50%;
  flex-shrink: 0;
  border: 2px solid #5c6475;
  padding: 5px;
  background-color: lightgrey;
  margin: 5px;
  flex-wrap: wrap;
  max-width: 100%;
  overflow-wrap: anywhere;

  &:hover {
    cursor: ${(props) => (props.clickable ? "pointer" : "default")};
    background-color: ${(props) =>
      props.clickable ? "darkgrey" : "lightgrey"};
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

export const SearchFilterBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
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
