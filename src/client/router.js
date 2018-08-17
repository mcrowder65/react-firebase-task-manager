import React from "react";
import PropTypes from "prop-types";
import { Router as BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "lodash/fp";
import firebase from "@firebase/app";
import "@firebase/auth";

import { routes } from "./constants";
import { browserHistory } from "./browser-history";
import { Login, Home, Signup } from "./routes";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  content: {
    marginTop: 80
  }
};
class Router extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  routeToLogin = () => {
    browserHistory.push(routes.LOGIN);
  };

  routeToSignup = () => {
    browserHistory.push(routes.SIGNUP);
  };

  routeToHome = () => {
    browserHistory.push(routes.HOME);
  };
  getButtons = async () => {
    const currentUser = await firebase.auth().currentUser;
    console.log(currentUser);
  };
  render() {
    const { classes } = this.props;
    this.getButtons();
    return (
      <div className={classes.body}>
        <BrowserRouter history={browserHistory}>
          <React.Fragment>
            <AppBar>
              <Toolbar>
                <Typography
                  onClick={this.routeToHome}
                  variant="title"
                  color="inherit"
                  className={classes.flex}
                >
                  Task Manager
                </Typography>
                <Button color="inherit" onClick={this.routeToLogin}>
                  LOGIN
                </Button>
                <Button color="inherit" onClick={this.routeToSignup}>
                  SIGNUP
                </Button>
              </Toolbar>
            </AppBar>
            <div className={classes.content}>
              <Route exact path={routes.HOME} component={Home} />
              <Route path={routes.LOGIN} component={Login} />
              <Route path={routes.SIGNUP} component={Signup} />
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

const enhance = compose(withStyles(styles));
export default enhance(Router);
