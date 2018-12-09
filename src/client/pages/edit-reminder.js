import React from "react";
import PropTypes from "prop-types";
import { Modal, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { format } from "date-fns";

import { compose } from "../utils";
import SetReminder from "../components/set-reminder";
import { withApiCall } from "../components/state-utils";
import { setReminder } from "../models/reminder-model";

class EditReminder extends React.Component {
  static propTypes = {
    _setIsEditing: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    reminder: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    apiCall: PropTypes.func.isRequired
  };
  state = {};
  componentDidUpdate() {
    if (this.state.id !== this.props.reminder.id) {
      this.setState({
        id: this.props.reminder.id,
        receivingEmailAccount: this.props.reminder.receivingEmailAccount,
        dateToSend: format(this.props.reminder.millisecondsToSend),
        timeToSendReminder: format(
          this.props.reminder.millisecondsToSend,
          "hh:mm"
        ),
        subject: this.props.reminder.subject,
        body: this.props.reminder.body
      });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    this.props.apiCall(async () => {
      await setReminder(this.state);
      this.props._setIsEditing(false, {});
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { classes, isEditing } = this.props;
    return (
      <Modal open={isEditing} className={classes.centered}>
        <Card className={classes.card}>
          <SetReminder
            isFetching={this.props.isFetching}
            receivingEmailAccount={this.state.receivingEmailAccount}
            subject={this.state.subject}
            timeToSendReminder={this.state.timeToSendReminder}
            dateToSend={this.state.dateToSend}
            _onSubmit={this.onSubmit}
            _onChange={this.onChange}
          />
        </Card>
      </Modal>
    );
  }
}

const styles = {
  card: {
    width: "300px",
    minHeight: "400px"
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

const enhance = compose(
  withStyles(styles),
  withApiCall
);
export default enhance(EditReminder);
