import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Search from "./components/Search/Search.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import Products from "./components/Products/Products.jsx";
import Services from "./components/Services/Services.jsx";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/search" component={SearchResults} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/services" component={Services} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
