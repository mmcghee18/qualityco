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

export const ResultsBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-self: flex-start;
  margin-top: 30px;
`;

export const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : null)};
  align-items: ${(props) => (props.alignItems ? props.alignItems : null)};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : null};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.alignItems ? props.alignItems : null)};
  padding: ${(props) => (props.padding ? props.padding : null)};
`;

export const SwitchLabel = styled.div`
  margin-left: 7px;
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  height: 200px;
`;

export const ResultImage = styled.img`
  height: 100%;
`;

export const ResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  margin-left: 20px;
`;

export const Tag = styled.div`
  border: 2px solid #5c6475;
  padding: 5px;
  background-color: lightgrey;
  margin: 5px;
`;
