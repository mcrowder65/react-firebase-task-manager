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

import { compose } from "../utils";
import LoaderCard from "../components/reusable/loader-card";
import { StateProps } from "../components/state-utils";
import { browserHistory } from "../browser-history";
import { routes } from "../constants";
import { login } from "../utils/firebase-utils";

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
    classes: PropTypes.object.isRequired
  };
  state = {
    email: "",
    password: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  login = async (e, refreshCurrentUser) => {
    const { email, password } = this.state;
    if (email && password && e.preventDefault) {
      e.preventDefault();
    }
    try {
      await login(email, password);
      refreshCurrentUser();
      browserHistory.push(routes.HOME);
    } catch (error) {
      // TODO move to modal
      alert(error.message);
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <LoaderCard className={classes.card}>
          <StateProps>
            {context => {
              return (
                <React.Fragment>
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
                      onClick={e =>
                        context.networkRequest(() =>
                          this.login(e, context.refreshCurrentUser)
                        )
                      }
                    >
                      Sign in
                    </Button>
                  </form>
                </React.Fragment>
              );
            }}
          </StateProps>
        </LoaderCard>
      </div>
    );
  }
}

const enhance = compose(withStyles(styles));

export default enhance(Login);
