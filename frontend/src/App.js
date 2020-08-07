import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Search from "./components/Search/Search.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";

function App() {
  // const [items, setItems] = useState(null);

  // useEffect(() => {
  //   const callApi = async () => {
  //     const result = await fetch(`http://localhost:5000/api/products`)
  //       .then((response) => response.json())
  //       .then((data) => setItems(data));
  //   };
  //   callApi();
  // }, []);

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/search" component={SearchResults} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
