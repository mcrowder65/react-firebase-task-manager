import React from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { format } from "date-fns";

import { compose } from "../utils";

function Reminder(props) {
  return (
    <Card className={props.classes.card}>
      <Typography>{props.receivingEmailAccount}</Typography>
      <Typography>{props.subject}</Typography>
      <Typography>{props.body}</Typography>
      <Typography>
        {format(props.dateToSend, "MM/DD")} {props.timeToSendReminder}
      </Typography>
    </Card>
  );
}

Reminder.propTypes = {
  classes: PropTypes.object.isRequired,
  dateToSend: PropTypes.string.isRequired,
  receivingEmailAccount: PropTypes.string.isRequired,
  timeToSendReminder: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  body: PropTypes.string
};

Reminder.defaultProps = {
  body: ""
};

const styles = {
  card: {
    width: 300,
    margin: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
};

const enhance = compose(withStyles(styles));

export default enhance(Reminder);
