import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import Products from "./components/Products/Products.jsx";
import Services from "./components/Services/Services.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [type, setType] = useState("products");
  const [category, setCategory] = useState(null);
  const [redirectSearch, setRedirectSearch] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchTerm) setRedirectSearch(true);
    else setRedirectSearch(false);
  }, [searchTerm]);

  return (
    <Router>
      <div>
        {redirectSearch && <Redirect to="/search" />}

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
            <Home
              setSearchTerm={setSearchTerm}
              type={type}
              setType={setType}
              setLoading={setLoading}
            />
          </Route>
          <Route exact path="/search">
            <SearchResults
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              type={type}
              loading={loading}
              setLoading={setLoading}
            />
          </Route>
          <Route exact path="/products">
            <Products
              category={category}
              setCategory={setCategory}
              loading={loading}
              setLoading={setLoading}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
