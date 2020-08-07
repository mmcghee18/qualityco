import styled, { createGlobalStyle } from "styled-components";

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
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 2px solid #5c6475;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;

  @media ${devices.tablet} {
    flex-direction: column;
    align-items: center;
  }
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
  }
  @media ${devices.mobile} {
    font-size: 0.75em;
  }
`;

export const SearchTitle = styled.h1`
  margin-bottom: 10%;
  text-align: center;
  color: #5c6475;
  font-weight: bold;

  @media ${devices.tablet} {
    font-size: 1.7em;
  }
  @media ${devices.mobile} {
    font-size: 1em;
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
