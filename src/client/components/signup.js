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

import { withStateProps } from "./state-utils";
import LoaderCard from "./reusable/loader-card";
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
  onSubmit = async e => {
    if (this.state.email && this.state.password) {
      e.preventDefault();
    }
    try {
      this.props.startFetching();
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      browserHistory.push(routes.HOME);
    } catch (error) {
      // TODO move to modal
      // eslint-disable-next-line no-alert
      alert(error.message);
    } finally {
      this.props.stopFetching();
    }
  };
  getButtons = async () => {
    const currentUser = await firebase.auth().currentUser;
    console.log(currentUser);
  };
  render() {
    this.getButtons();
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <LoaderCard className={classes.card}>
          <Typography variant="headline">Sign up</Typography>
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
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
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
  withStateProps,
  withStyles(styles)
);

export default enhance(Login);
