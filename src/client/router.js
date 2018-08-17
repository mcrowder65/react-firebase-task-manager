import React from "react";
import PropTypes from "prop-types";
import { Router as BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "lodash/fp";

import { routes } from "./constants";
import Home from "./components/home";
import Login from "./components/login";
import { browserHistory } from "./browser-history";

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
  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter history={browserHistory}>
        <React.Fragment>
          <AppBar>
            <Toolbar>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Task Manager
              </Typography>
              <Button color="inherit" onClick={this.routeToLogin}>
                LOGIN
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <Route exact path="/" component={Home} />
            <Route path={routes.LOGIN} component={Login} />
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const enhance = compose(withStyles(styles));
export default enhance(Router);
