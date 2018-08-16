import React from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";

import Router from "./router";

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept();
}
const App = () => <Router />;

/* global document */
ReactDOM.render(<App />, document.getElementById("root"));
