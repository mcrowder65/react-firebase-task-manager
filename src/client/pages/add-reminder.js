import React from "react";
import PropTypes from "prop-types";
import { Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { isEqual } from "date-fns";
import firebase from "@firebase/app";
import "@firebase/database";

import { compose, getFormattedDate } from "../utils";
import { addReminder } from "../models/reminder-model";
import * as userModel from "../models/user-model";
import { withApiCall } from "../components/state-utils";
import Reminders from "../components/reminders";
import SetReminder from "../components/set-reminder";
import { getUser } from "../models/user-model";

function AddReminder(props) {
  const [user, setUser] = React.useState({});

  React.useEffect(async () => {
    const user = await getUser();

    setUser(user);
  });
  console.log("user ", user);
  return (
    <div className={props.classes.centered}>
      <Card className={props.classes.card}>
        <SetReminder />
      </Card>
      <div className={props.classes.reminders}>
        {/*<Reminders reminders={getReminders()} />*/}
      </div>
    </div>
  );
}
AddReminder.propTypes = {
  classes: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  apiCall: PropTypes.func.isRequired,
};

AddReminder.defaultProps = {
  isFetching: false,
};

const styles = {
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  reminders: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    height: "65vh",
    minWidth: "350px",
    minHeight: "400px",
    maxHeight: "600px",
  },
};

const enhance = compose(
  withStyles(styles),
  withApiCall,
);
export default enhance(AddReminder);
