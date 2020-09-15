import React, { useState } from "react";
import { MainContainer, PageWrapper, FooterWrapper } from "./styles/styles.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import Products from "./components/Products/Products.jsx";
import Services from "./components/Services/Services.jsx";
import Mission from "./components/Mission/Mission.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [home, setHome] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [type, setType] = useState("products");
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <Router>
      <MainContainer homepage={home}>
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
                setHome={setHome}
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
                setHome={setHome}
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
                setHome={setHome}
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
                setHome={setHome}
              />
            </PageWrapper>
          </Route>
          <Route exact path="/mission">
            <PageWrapper>
              <Mission setLoading={setLoading} setHome={setHome} />
            </PageWrapper>
          </Route>
        </Switch>

        <Footer
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
        />
        {!loading && (
          <FooterWrapper onClick={() => setDrawerVisible(true)}>
            Submit a brand
          </FooterWrapper>
        )}
      </MainContainer>
    </Router>
  );
}

export default App;
