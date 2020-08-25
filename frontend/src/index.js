import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyle } from "./styles/styles";
import "antd/dist/antd.less";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faLeaf,
  faMapMarkerAlt,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHeart, faLeaf, faMapMarkerAlt, faDollarSign);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
