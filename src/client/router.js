import React from "react";
import PropTypes from "prop-types";
import { Router as BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import {
  Menu,
  MenuItem,
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
import { Login, Home, Signup, AddReminder, Profile } from "./routes";
import { withStateProps } from "./components/state-utils";
import { logout } from "./utils/firebase-utils";

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
    refreshCurrentUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object
  };
  static defaultProps = {
    currentUser: null
  };
  state = {
    isSelectOpen: null
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

  routeToProfile = () => {
    browserHistory.push(routes.PROFILE);
    this.setState({ isSelectOpen: null });
  };

  routeToAddReminder = () => {
    browserHistory.push(routes.ADD_REMINDER);
    this.setState({ isSelectOpen: null });
  };
  logout = async () => {
    try {
      await logout();
      this.setState({ isSelectOpen: null });
      this.props.refreshCurrentUser();
    } catch (error) {
      alert(error.message);
    }
  };
  onClose = () => {
    this.setState({ isSelectOpen: null });
  };
  onOpen = e => {
    this.setState({ isSelectOpen: e.currentTarget });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.body}>
        <Menu
          anchorEl={this.state.isSelectOpen}
          open={!!this.state.isSelectOpen}
          onClose={this.onClose}
        >
          <MenuItem onClick={this.routeToAddReminder}>Add a reminder</MenuItem>
          <MenuItem onClick={this.routeToProfile}>Profile</MenuItem>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </Menu>
        <BrowserRouter history={browserHistory}>
          {this.props.currentUser ? (
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
                      <IconButton color="inherit" onClick={this.onOpen}>
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
                <Route path={routes.PROFILE} component={Profile} />
                <Route path={routes.ADD_REMINDER} component={AddReminder} />
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
