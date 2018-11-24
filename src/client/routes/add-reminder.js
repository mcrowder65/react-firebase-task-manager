import React from "react";
import PropTypes from "prop-types";
import { TextField, Typography, Button, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { format, isEqual, addDays } from "date-fns";
import firebase from "@firebase/app";
import "@firebase/database";

import { compose, getFormattedDate } from "../utils";
import { addReminder } from "../models/reminder-model";
import Reminder from "../components/reminder";
import { getUser, getUserMetadata } from "../models/user-model";
import LoaderButton from "../components/loader-button";
import { withApiCall } from "../components/state-utils";
import Reminders from "../components/reminders";

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
    timeToSendReminder: "23:59",
    subject: "",
    body: "",
    isFocused: 0,
    reminders: {}
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
  handleKey = ({ key }) => {
    if (this.state.isFocused === 0) {
      if (key === "ArrowLeft") {
        this.changeDateToSend(-1);
      } else if (key === "ArrowRight") {
        this.changeDateToSend(1);
      }
    }
  };
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKey);
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
    window.addEventListener("keydown", this.handleKey);
  }
  changeDateToSend = num => {
    this.setState(state => {
      return {
        dateToSend: addDays(state.dateToSend, num)
      };
    });
  };
  onFocus = num => {
    this.setState(state => {
      return {
        isFocused: num + state.isFocused
      };
    });
  };

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
          <form className={this.props.classes.content} onSubmit={this.onSubmit}>
            <Typography variant="h6">Reminder content</Typography>
            <TextField
              onBlur={() => this.onFocus(-1)}
              onFocus={() => this.onFocus(1)}
              name="receivingEmailAccount"
              onChange={this.onChange}
              className={this.props.classes.receivingEmailAccount}
              required
              label="Receiving email account"
              value={this.state.receivingEmailAccount}
            />
            <Typography variant="body1">
              {format(this.state.dateToSend, "dddd")}
            </Typography>
            <div className={this.props.classes.datePicker}>
              <Button
                className={this.props.classes.plusser}
                color="primary"
                variant="contained"
                onClick={() => this.changeDateToSend(-1)}
              >
                -1
              </Button>
              <TextField
                id="date"
                onBlur={() => this.onFocus(-1)}
                onFocus={() => this.onFocus(1)}
                onChange={this.onChange}
                name="dateToSend"
                value={getFormattedDate(this.state.dateToSend)}
                label="Date to send reminder"
                type="date"
              />
              <Button
                className={this.props.classes.plusser}
                color="primary"
                variant="contained"
                onClick={() => this.changeDateToSend(1)}
              >
                +1
              </Button>
            </div>
            <TextField
              onBlur={() => this.onFocus(-1)}
              onFocus={() => this.onFocus(1)}
              name="timeToSendReminder"
              className={this.props.classes.timeToSendReminder}
              required
              label="Time to send reminder"
              value={this.state.timeToSendReminder}
              onChange={this.onChange}
            />
            <TextField
              onBlur={() => this.onFocus(-1)}
              onFocus={() => this.onFocus(1)}
              name="subject"
              value={this.state.subject}
              onChange={this.onChange}
              required
              label="Subject"
            />
            <TextField
              onBlur={() => this.onFocus(-1)}
              onFocus={() => this.onFocus(1)}
              label="Body"
              name="body"
              value={this.state.body}
              onChange={this.onChange}
            />
            <LoaderButton
              isFetching={this.props.isFetching}
              variant="contained"
              color="primary"
              type="submit"
            >
              Set reminder
            </LoaderButton>
          </form>
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
  receivingEmailAccount: {
    width: "250px"
  },
  timeToSendReminder: {
    width: "200px"
  },
  card: {
    height: "65vh",
    width: "50%",
    minHeight: "400px"
  },
  content: {
    height: "100%",
    width: "100%",
    justifyContent: "space-around",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  datePicker: {
    width: "250px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  plusser: {
    maxWidth: "15px",
    minWidth: "15px",
    maxHeight: "40px",
    minHeight: "40px"
  }
};

const enhance = compose(
  withStyles(styles),
  withApiCall
);
export default enhance(AddReminder);
