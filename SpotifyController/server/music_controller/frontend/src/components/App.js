import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./HomePage.js";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
}

// Use createRoot instead of render
const appDiv = document.getElementById("app");
const root = ReactDOM.createRoot(appDiv);
root.render(<App />);
