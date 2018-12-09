import React from "react";
import PropTypes from "prop-types";

import Reminder from "./reminder";

function Reminders({ reminders }) {
  return (
    <React.Fragment>
      {reminders.map(([id, reminder], index) => {
        return (
          <Reminder
            id={id}
            key={index}
            millisecondsToSend={reminder.millisecondsToSend}
            dateToSend={reminder.dateToSend}
            receivingEmailAccount={reminder.receivingEmailAccount}
            timeToSendReminder={reminder.timeToSendReminder}
            subject={reminder.subject}
            body={reminder.body}
          />
        );
      })}
    </React.Fragment>
  );
}

Reminders.propTypes = {
  reminders: PropTypes.array.isRequired
};

export default Reminders;
