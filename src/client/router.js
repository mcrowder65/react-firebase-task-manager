import React from "react";
import PropTypes from "prop-types";
import { Router as BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  IconButton
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "./utils";
import { routes } from "./constants";
import { browserHistory } from "./browser-history";
import { Login, Home, Signup } from "./routes";
import { withStateProps } from "./components/state-utils";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  content: {
    marginTop: 80
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};
class Router extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    currentUser: PropTypes.object
  };
  static defaultProps = {
    currentUser: {}
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
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.body}>
        <BrowserRouter history={browserHistory}>
          {this.props.currentUser.email ? (
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
                  {this.props.currentUser.email ? (
                    <React.Fragment>
                      <IconButton color="inherit">
                        <MenuIcon />
                      </IconButton>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Button color="inherit" onClick={this.routeToLogin}>
                        LOGIN
                      </Button>
                      <Button color="inherit" onClick={this.routeToSignup}>
                        SIGNUP
                      </Button>
                    </React.Fragment>
                  )}
                </Toolbar>
              </AppBar>
              <div className={classes.content}>
                <Route exact path={routes.HOME} component={Home} />
                <Route path={routes.LOGIN} component={Login} />
                <Route path={routes.SIGNUP} component={Signup} />
              </div>
            </React.Fragment>
          ) : (
            <div className={classes.spinner}>
              <CircularProgress />
            </div>
          )}
        </BrowserRouter>
      </div>
    );
  }
}

const enhance = compose(
  withStyles(styles),
  withStateProps
);
export default enhance(Router);
