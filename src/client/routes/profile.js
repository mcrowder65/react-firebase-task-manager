import React from "react";
import { TextField, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { getUserMetadata, setUser } from "../models/user-model";
import { compose } from "../utils";
import { withApiCall } from "../components/state-utils";
import LoaderButton from "../components/reusable/loader-button";

class Profile extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    apiCall: PropTypes.func.isRequired
  };
  state = {
    receivingEmailAccount: "",
    sendingEmailAccount: "",
    sendingEmailPassword: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.apiCall(() =>
      setUser({
        receivingEmailAccount: this.state.receivingEmailAccount,
        sendingEmailAccount: this.state.sendingEmailAccount,
        sendingEmailPassword: this.state.sendingEmailPassword
      })
    );
  };
  async componentDidMount() {
    const {
      receivingEmailAccount,
      sendingEmailAccount,
      sendingEmailPassword
    } = await getUserMetadata();
    this.setState({
      receivingEmailAccount,
      sendingEmailAccount,
      sendingEmailPassword
    });
  }
  render() {
    return (
      <div className={this.props.classes.centered}>
        <Card className={this.props.classes.card}>
          <form className={this.props.classes.content} onSubmit={this.onSubmit}>
            <TextField
              type="email"
              className={this.props.classes.email}
              label="Default Receiving Email"
              required
              name="receivingEmailAccount"
              onChange={this.onChange}
              value={this.state.receivingEmailAccount}
            />
            <TextField
              type="email"
              className={this.props.classes.email}
              label="Sending Email Account"
              required
              name="sendingEmailAccount"
              onChange={this.onChange}
              value={this.state.sendingEmailAccount}
            />
            <TextField
              className={this.props.classes.email}
              label="Sending Email Password"
              required
              name="sendingEmailPassword"
              onChange={this.onChange}
              value={this.state.sendingEmailPassword}
            />
            <LoaderButton
              isFetching={this.props.isFetching}
              variant="contained"
              color="primary"
              type="submit"
            >
              SAVE
            </LoaderButton>
          </form>
        </Card>
      </div>
    );
  }
}

const styles = {
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  email: {
    width: "250px"
  },
  card: {
    minWidth: "300px",
    maxWidth: "300px",
    height: "50vh",
    maxHeight: "300px"
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%"
  }
};
const enhance = compose(
  withStyles(styles),
  withApiCall
);

export default enhance(Profile);
