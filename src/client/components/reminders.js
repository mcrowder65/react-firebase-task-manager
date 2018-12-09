import React from "react";
import PropTypes from "prop-types";

import Reminder from "./reminder";

class Reminders extends React.Component {
  state = {
    isEditing: false
  };
  setIsEditing = isEditing => {
    this.setState({ isEditing });
  };
  render() {
    const { reminders } = this.props;
    return (
      <React.Fragment>
        {reminders.map(([id, reminder], index) => {
          return (
            <Reminder
              id={id}
              key={index}
              dateToSend={reminder.dateToSend}
              millisecondsToSend={reminder.millisecondsToSend}
              receivingEmailAccount={reminder.receivingEmailAccount}
              timeToSendReminder={reminder.timeToSendReminder}
              subject={reminder.subject}
              body={reminder.body}
              _onEditClick={() => {
                this.setIsEditing(true);
                console.log({ [id]: reminder });
              }}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

Reminders.propTypes = {
  reminders: PropTypes.array.isRequired
};

export default Reminders;
