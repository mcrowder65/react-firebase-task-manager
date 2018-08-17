import React from "react";
import ReactDOM from "react-dom";
import "babel-polyfill";
import { withStyles } from "@material-ui/core/styles";

import Router from "./router";

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept();
}
const styles = theme => ({
  "@global": {
    html: {
      background: theme.palette.background.default
    }
  }
});
const Wrapper = withStyles(styles)(props => props.children);
const App = () => (
  <Wrapper>
    <Router />
  </Wrapper>
);

/* global document */
ReactDOM.render(<App />, document.getElementById("root"));
