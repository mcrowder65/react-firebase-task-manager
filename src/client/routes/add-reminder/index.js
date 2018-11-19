import React from "react";
import PropTypes from "prop-types";
import { TextField, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import firebase from "@firebase/database";

import LoaderCard from "../../components/reusable/loader-card";
import { compose } from "../../utils";

class AddReminder extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  };
  static defaultProps = {
    isFetching: false
  };
  getFormattedDateToSend = d => {
    return format(d, "YYYY-MM-DD");
  };

  state = {
    receivingEmailAccount: "mcrowder65@gmail.com",
    dateToSend: new Date(),
    timeToSendReminder: "11:25",
    subject: "hello world!",
    body: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const defaultDatabase = firebase.database();
    console.log(defaultDatabase);
  };
  render() {
    return (
      <div className={this.props.classes.centered}>
        <LoaderCard
          isFetching={this.props.isFetching}
          className={this.props.classes.card}
        >
          <form className={this.props.classes.content} onSubmit={this.onSubmit}>
            <Typography variant="title">Reminder content</Typography>
            <TextField
              name="receivingEmailAccount"
              onChange={this.onChange}
              className={this.props.classes.receivingEmailAccount}
              required
              label="Receiving email account"
              value={this.state.receivingEmailAccount}
            />
            <Typography variant="body2">
              {format(this.state.dateToSend, "dddd")}
            </Typography>
            <TextField
              id="date"
              onChange={this.onChange}
              name="dateToSend"
              value={this.getFormattedDateToSend(this.state.dateToSend)}
              label="Date to send reminder"
              type="date"
            />
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
  receivingEmailAccount: {
    width: "300px"
  },
  timeToSendReminder: {
    width: "225px"
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
  }
};

const enhance = compose(withStyles(styles));
export default enhance(AddReminder);
