import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    const callApi = async () => {
      const result = await fetch("http://localhost:5000/api/get-records")
        .then((response) => response.json())
        .then((data) => setItems(data));
    };
    callApi();
  }, []);

  console.log(items);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
