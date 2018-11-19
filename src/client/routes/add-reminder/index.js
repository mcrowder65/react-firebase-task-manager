import React from "react";
import PropTypes from "prop-types";
import { TextField, Typography, Button, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { PlusOne } from "@material-ui/icons";
import { format, isEqual, addDays } from "date-fns";

import LoaderCard from "../../components/reusable/loader-card";
import { compose, getFormattedDate } from "../../utils";
import {
  addReminder,
  getUserRemindersByDay
} from "../../models/reminder-model";
import Reminder from "../../components/reminder";

class AddReminder extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  };
  static defaultProps = {
    isFetching: false
  };

  state = {
    receivingEmailAccount: "mcrowder65@gmail.com",
    dateToSend: new Date(),
    timeToSendReminder: "11:25",
    subject: "hello world!",
    body: "",
    reminders: {}
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = async e => {
    e.preventDefault();
    await addReminder({
      dateToSend: this.state.dateToSend,
      receivingEmailAccount: this.state.receivingEmailAccount,
      timeToSendReminder: this.state.timeToSendReminder,
      subject: this.state.subject,
      body: this.state.body
    });
    this.getReminders();
  };
  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState.dateToSend, this.state.dateToSend)) {
      this.getReminders();
    }
  }
  getReminders = async () => {
    const reminders = await getUserRemindersByDay(this.state.dateToSend);
    this.setState({ reminders: reminders || {} });
  };
  componentDidMount() {
    this.getReminders();
  }
  changeDateToSend = num => {
    this.setState(state => {
      return {
        dateToSend: addDays(state.dateToSend, num)
      };
    });
  };
  render() {
    return (
      <div className={this.props.classes.centered}>
        <LoaderCard
          isFetching={this.props.isFetching}
          className={this.props.classes.card}
        >
          <form className={this.props.classes.content} onSubmit={this.onSubmit}>
            <Typography variant="h6">Reminder content</Typography>
            <TextField
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
              name="timeToSendReminder"
              className={this.props.classes.timeToSendReminder}
              required
              label="Time to send reminder"
              value={this.state.timeToSendReminder}
              onChange={this.onChange}
            />
            <TextField
              name="subject"
              value={this.state.subject}
              onChange={this.onChange}
              required
              label="Subject"
            />
            <TextField
              label="Body"
              name="body"
              value={this.state.body}
              onChange={this.onChange}
            />
            <Button variant="contained" color="primary" type="submit">
              Set reminder
            </Button>
          </form>
        </LoaderCard>
        <div className={this.props.classes.reminders}>
          {Object.values(this.state.reminders).map((reminder, index) => {
            return (
              <Reminder
                key={index}
                dateToSend={reminder.dateToSend}
                receivingEmailAccount={reminder.receivingEmailAccount}
                timeToSendReminder={reminder.timeToSendReminder}
                subject={reminder.subject}
                body={reminder.body}
              />
            );
          })}
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
    width: "50%"
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

const enhance = compose(withStyles(styles));
export default enhance(AddReminder);
