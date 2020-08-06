import styled, { createGlobalStyle } from "styled-components";

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
  padding-right: 100px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
