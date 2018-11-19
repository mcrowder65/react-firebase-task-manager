import React from "react";
import ReactDOM from "react-dom";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import firebase from "@firebase/app";

import registerServiceWorker from "../registerServiceWorker";
import Router from "./router";
import { StateProvider } from "./components/state-utils";

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

firebase.initializeApp({
  apiKey: "AIzaSyDNzosNTGNw5PSU3Ie8Dhi6RrGLdjW7Bgs",
  authDomain: "task-manager-82de4.firebaseapp.com",
  databaseURL: "https://task-manager-82de4.firebaseio.com",
  projectId: "task-manager-82de4",
  storageBucket: "task-manager-82de4.appspot.com",
  messagingSenderId: "869805583292"
});
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});
const Wrapper = withStyles(styles)(props => props.children);
const App = () => (
  <MuiThemeProvider theme={theme}>
    <StateProvider>
      <Wrapper>
        <Router />
      </Wrapper>
    </StateProvider>
  </MuiThemeProvider>
);

/* global document */
ReactDOM.render(<App />, document.getElementById("root"));

registerServiceWorker();
