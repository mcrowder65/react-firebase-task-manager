import React from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "@material-ui/core";

function Reminder(props) {
  return (
    <Card>
      <Typography>{props.receivingEmailAccount}</Typography>
      <Typography>{props.subject}</Typography>
      <Typography>{props.body}</Typography>
      <Typography>{props.dateToSend}</Typography>
      <Typography>{props.timeToSendReminder}</Typography>
    </Card>
  );
}

Reminder.propTypes = {
  dateToSend: PropTypes.string.isRequired,
  receivingEmailAccount: PropTypes.string.isRequired,
  timeToSendReminder: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  body: PropTypes.string
};

Reminder.defaultProps = {
  body: ""
};
export default Reminder;
