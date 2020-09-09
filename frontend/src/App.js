import React, { useState, useEffect } from "react";
import { MainContainer, PageWrapper } from "./styles/styles.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import queryString from "query-string";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import Products from "./components/Products/Products.jsx";
import Services from "./components/Services/Services.jsx";
import Mission from "./components/Mission/Mission.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [type, setType] = useState("products");
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const callApi = async () => {
  //     const baseUrl =
  //       process.env.NODE_ENV === "production"
  //         ? "https://qualityco-backend.herokuapp.com"
  //         : "http://localhost:5000";
  //     const params = queryString.stringify({
  //       name: "Megan Pera",
  //       website: "castlight.comm",
  //     });
  //     const apiUrl = `${baseUrl}/api/suggestBrand?${params}`;

  //     try {
  //       await fetch(apiUrl)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log({ data });
  //         });
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   callApi();
  // }, []);

  return (
    <Router>
      <MainContainer>
        <NavBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          type={type}
          setType={setType}
          setCategory={setCategory}
          setLoading={setLoading}
        />
        <Switch>
          <Route exact path="/">
            <PageWrapper>
              <Home
                setSearchTerm={setSearchTerm}
                type={type}
                setType={setType}
                setLoading={setLoading}
              />
            </PageWrapper>
          </Route>
          <Route exact path="/search">
            <PageWrapper>
              <SearchResults
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                type={type}
                loading={loading}
                setLoading={setLoading}
              />
            </PageWrapper>
          </Route>
          <Route exact path="/products">
            <PageWrapper>
              <Products
                category={category}
                setCategory={setCategory}
                loading={loading}
                setLoading={setLoading}
              />
            </PageWrapper>
          </Route>
          <Route exact path="/services">
            <PageWrapper>
              <Services
                category={category}
                setCategory={setCategory}
                loading={loading}
                setLoading={setLoading}
              />
            </PageWrapper>
          </Route>
          <Route exact path="/mission">
            <PageWrapper>
              <Mission />
            </PageWrapper>
          </Route>
        </Switch>

        {!loading && <Footer />}
      </MainContainer>
    </Router>
  );
}

export default App;
