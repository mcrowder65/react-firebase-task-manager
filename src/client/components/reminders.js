import React from "react";
import PropTypes from "prop-types";

import Reminder from "./reminder";
import EditReminder from "../pages/edit-reminder";

class Reminders extends React.Component {
  state = {
    isEditing: false,
    currentReminder: {}
  };
  setIsEditing = (isEditing, currentReminder) => {
    this.setState({ isEditing, currentReminder });
  };
  render() {
    const { reminders } = this.props;
    return (
      <React.Fragment>
        <EditReminder
          isEditing={this.state.isEditing}
          _setIsEditing={this.setIsEditing}
          reminder={this.state.currentReminder}
        />
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
                this.setIsEditing(true, { ...reminder, id });
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
