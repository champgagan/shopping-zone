import React, { Component } from "react";
import "./App.css";
import Router from "./Routers";
import MastHead from "./pages/MastHead";
import Footers from "./pages/Footers";
import Loader from "./pages/Loader";

class App extends Component {
  render() {
    return (
      <>
        <MastHead />
        <div className="App">
          <Loader />
          <Router />
        </div>
        <Footers />
      </>
    );
  }
}

export default App;
