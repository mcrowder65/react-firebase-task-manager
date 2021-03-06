import React from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { format } from "date-fns";

import { compose } from "../utils";
import LoaderButton from "./loader-button";
import { WithApiCall } from "./state-utils";
import {
  deleteReminder,
  sendReminderImmediately
} from "../models/reminder-model";

function Reminder(props) {
  const {
    id,
    classes,
    receivingEmailAccount,
    subject,
    millisecondsToSend,
    body,
    _onEditClick
  } = props;
  return (
    <Card className={classes.card}>
      <Typography>{receivingEmailAccount}</Typography>
      <Typography>{subject}</Typography>
      <Typography>{body}</Typography>
      <Typography>{format(millisecondsToSend, "MM/DD hh:mm A")}</Typography>
      <div className={classes.buttons}>
        <WithApiCall>
          {({ isFetching, apiCall }) => {
            return (
              <LoaderButton
                size="small"
                isFetching={isFetching}
                variant="contained"
                color="primary"
                onClick={async () => {
                  await apiCall(async () => {
                    await deleteReminder(id);
                  });
                }}
              >
                Delete
              </LoaderButton>
            );
          }}
        </WithApiCall>
        <WithApiCall>
          {({ isFetching }) => {
            return (
              <LoaderButton
                size="small"
                isFetching={isFetching}
                variant="contained"
                color="primary"
                onClick={_onEditClick}
              >
                Edit
              </LoaderButton>
            );
          }}
        </WithApiCall>
        <WithApiCall>
          {({ isFetching, apiCall }) => {
            return (
              <LoaderButton
                size="small"
                isFetching={isFetching}
                variant="contained"
                color="primary"
                onClick={async () => {
                  await apiCall(async () => {
                    await sendReminderImmediately(id);
                  });
                }}
              >
                Send Now
              </LoaderButton>
            );
          }}
        </WithApiCall>
      </div>
    </Card>
  );
}

Reminder.propTypes = {
  classes: PropTypes.object.isRequired,
  receivingEmailAccount: PropTypes.string.isRequired,
  millisecondsToSend: PropTypes.number.isRequired,
  subject: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  _onEditClick: PropTypes.func.isRequired,
  body: PropTypes.string
};

Reminder.defaultProps = {
  body: ""
};

const styles = {
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%"
  },
  card: {
    width: 300,
    margin: 10,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
};

const enhance = compose(withStyles(styles));

export default enhance(Reminder);
