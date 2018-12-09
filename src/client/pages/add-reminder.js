import React from "react";
import PropTypes from "prop-types";
import { Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { isEqual } from "date-fns";
import firebase from "@firebase/app";
import "@firebase/database";

import { compose, getFormattedDate } from "../utils";
import { addReminder } from "../models/reminder-model";
import { getUser, getUserMetadata } from "../models/user-model";
import { withApiCall } from "../components/state-utils";
import Reminders from "../components/reminders";
import SetReminder from "../components/set-reminder";

class AddReminder extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    apiCall: PropTypes.func.isRequired
  };
  static defaultProps = {
    isFetching: false
  };

  state = {
    receivingEmailAccount: "",
    dateToSend: new Date(),
    timeToSendReminder: "",
    subject: "",
    body: "",
    isFocused: 0,
    reminders: {}
  };

  onSubmit = async e => {
    e.preventDefault();
    await this.props.apiCall(async () => {
      await addReminder({
        dateToSend: this.state.dateToSend,
        receivingEmailAccount: this.state.receivingEmailAccount,
        timeToSendReminder: this.state.timeToSendReminder,
        subject: this.state.subject,
        body: this.state.body,
        sendingEmailAccount: this.state.sendingEmailAccount,
        sendingEmailPassword: this.state.sendingEmailPassword
      });
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState.dateToSend, this.state.dateToSend)) {
      this.setupRef();
    }
  }
  setupRef = async () => {
    const currentUser = await getUser();

    const remindersRef = firebase
      .database()
      .ref(`reminders/${currentUser.uid}`)
      .orderByChild("dateToSend")
      .equalTo(getFormattedDate(this.state.dateToSend));
    remindersRef.on("value", snapshot => {
      this.setState({ reminders: snapshot.val() || {} });
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  getUserMetadata = async () => {
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
  };
  componentDidMount() {
    this.getUserMetadata();
    this.setupRef();
  }

  getReminders = () => {
    const reminders = Object.entries(this.state.reminders);
    // eslint-disable-next-line no-unused-vars
    reminders.sort(([keyA, a], [keyB, b]) => {
      if (a.millisecondsToSend > b.millisecondsToSend) {
        return 1;
      } else if (a.millisecondsToSend < b.millisecondsToSend) {
        return -1;
      } else {
        return 0;
      }
    });
    return reminders;
  };
  render() {
    return (
      <div className={this.props.classes.centered}>
        <Card className={this.props.classes.card}>
          <SetReminder
            _onChange={this.onChange}
            _onSubmit={this.onSubmit}
            isFetching={this.props.isFetching}
            receivingEmailAccount={this.state.receivingEmailAccount}
            dateToSend={this.state.dateToSend}
            timeToSendReminder={this.state.timeToSendReminder}
            subject={this.state.subject}
            _arrowKeyPressed={this.arrowKeyPressed}
            body={this.state.body}
          />
        </Card>
        <div className={this.props.classes.reminders}>
          <Reminders reminders={this.getReminders()} />
        </div>
      </div>
    );
  }
}

const styles = {
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  reminders: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  card: {
    height: "65vh",
    minWidth: "350px",
    minHeight: "400px",
    maxHeight: "600px"
  }
};

const enhance = compose(
  withStyles(styles),
  withApiCall
);
export default enhance(AddReminder);
