import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  Input,
  InputLabel,
  Button,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "lodash/fp";
import firebase from "@firebase/app";
import "@firebase/auth";

import LoaderCard from "./reusable/loader-card";
import { withStateProps } from "./state-utils";
import { browserHistory } from "../browser-history";
import { routes } from "../constants";

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: 300,
    padding: 20
  }
};
class Login extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    startFetching: PropTypes.func.isRequired,
    stopFetching: PropTypes.func.isRequired
  };
  state = {
    email: "",
    password: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  login = async e => {
    const { email, password } = this.state;
    if (email && password) {
      e.preventDefault();
    }
    try {
      this.props.startFetching();
      await firebase.auth().signInWithEmailAndPassword(email, password);
      browserHistory.push(routes.HOME);
    } catch (error) {
      // TODO move to modal
      // eslint-disable-next-line no-alert
      alert(error.message);
    } finally {
      this.props.stopFetching();
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <LoaderCard className={classes.card}>
          <Typography variant="headline">Login</Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={this.state.email}
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.onChange}
                autoComplete="current-password"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
              onClick={this.login}
            >
              Sign in
            </Button>
          </form>
        </LoaderCard>
      </div>
    );
  }
}

const enhance = compose(
  withStyles(styles),
  withStateProps
);

export default enhance(Login);
