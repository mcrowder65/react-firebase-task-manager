import React from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { format } from "date-fns";

import { compose } from "../utils";
import LoaderButton from "./reusable/loader-button";
import { WithApiCall } from "./state-utils";
import { deleteReminder } from "../models/reminder-model";

function Reminder(props) {
  return (
    <Card className={props.classes.card}>
      <Typography>{props.receivingEmailAccount}</Typography>
      <Typography>{props.subject}</Typography>
      <Typography>{props.body}</Typography>
      <Typography>
        {format(props.dateToSend, "MM/DD")} {props.timeToSendReminder}
      </Typography>
      <div className={props.classes.buttons}>
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
                    await deleteReminder(props.id);
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
              >
                Edit
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
  dateToSend: PropTypes.string.isRequired,
  receivingEmailAccount: PropTypes.string.isRequired,
  timeToSendReminder: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
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
