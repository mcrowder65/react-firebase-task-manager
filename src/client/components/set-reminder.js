import React from "react";
import PropTypes from "prop-types";
import { format, addDays } from "date-fns";
import { TextField, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose, getFormattedDate } from "../utils";
import LoaderButton from "./loader-button";

class SetReminder extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({
      content: PropTypes.string,
      receivingEmailAccount: PropTypes.string,
      datePicker: PropTypes.string,
      plusser: PropTypes.string,
      timeToSendReminder: PropTypes.string
    }).isRequired,
    isFetching: PropTypes.bool.isRequired,
    receivingEmailAccount: PropTypes.string.isRequired,
    dateToSend: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      .isRequired,
    timeToSendReminder: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    _onChange: PropTypes.func.isRequired,
    _onSubmit: PropTypes.func.isRequired,
    body: PropTypes.string
  };

  static defaultProps = {
    body: ""
  };
  POSSIBLE_KEYS = {
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight"
  };
  state = {
    isFocused: 0
  };
  handleKey = ({ key }) => {
    const changeDate = n => {
      this.props._onChange({
        target: { name: "dateToSend", value: addDays(this.props.dateToSend, n) }
      });
    };
    if (this.state.isFocused === 0) {
      if (key === this.POSSIBLE_KEYS.ARROW_LEFT) {
        changeDate(-1);
      } else if (key === this.POSSIBLE_KEYS.ARROW_RIGHT) {
        changeDate(1);
      }
    }
  };
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKey);
  }
  componentDidMount() {
    window.addEventListener("keydown", this.handleKey);
  }
  onFocus = num => {
    this.setState(state => {
      return {
        isFocused: num + state.isFocused
      };
    });
  };
  render() {
    return (
      <form
        className={this.props.classes.content}
        onSubmit={this.props._onSubmit}
      >
        <Typography variant="h6">Reminder content</Typography>
        <TextField
          onBlur={() => this.onFocus(-1)}
          onFocus={() => this.onFocus(1)}
          name="receivingEmailAccount"
          onChange={this.props._onChange}
          className={this.props.classes.receivingEmailAccount}
          required
          label="Receiving email account"
          value={this.props.receivingEmailAccount}
        />
        <Typography variant="body1">
          {format(this.props.dateToSend, "dddd")}
        </Typography>
        <div className={this.props.classes.datePicker}>
          <Button
            className={this.props.classes.plusser}
            color="primary"
            variant="contained"
            onClick={() =>
              this.handleKey({ key: this.POSSIBLE_KEYS.ARROW_LEFT })
            }
          >
            -1
          </Button>
          <TextField
            id="date"
            onBlur={() => this.onFocus(-1)}
            onFocus={() => this.onFocus(1)}
            onChange={this.props._onChange}
            name="dateToSend"
            value={getFormattedDate(this.props.dateToSend)}
            label="Date to send"
            type="date"
          />
          <Button
            className={this.props.classes.plusser}
            color="primary"
            variant="contained"
            onClick={() =>
              this.handleKey({ key: this.POSSIBLE_KEYS.ARROW_RIGHT })
            }
          >
            +1
          </Button>
        </div>
        <TextField
          onBlur={() => this.onFocus(-1)}
          onFocus={() => this.onFocus(1)}
          name="timeToSendReminder"
          className={this.props.classes.timeToSendReminder}
          required
          label="Time to send"
          value={this.props.timeToSendReminder}
          onChange={this.props._onChange}
        />
        <TextField
          onBlur={() => this.onFocus(-1)}
          onFocus={() => this.onFocus(1)}
          name="subject"
          value={this.props.subject}
          onChange={this.props._onChange}
          required
          label="Subject"
        />
        <TextField
          onBlur={() => this.onFocus(-1)}
          onFocus={() => this.onFocus(1)}
          label="Body"
          name="body"
          value={this.props.body}
          onChange={this.props._onChange}
        />
        <LoaderButton
          isFetching={this.props.isFetching}
          variant="contained"
          color="primary"
          type="submit"
        >
          Set reminder
        </LoaderButton>
      </form>
    );
  }
}
const styles = {
  content: {
    height: "100%",
    width: "100%",
    justifyContent: "space-around",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  receivingEmailAccount: {
    width: "250px"
  },
  datePicker: {
    width: "250px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  plusser: {
    maxWidth: "15px",
    minWidth: "15px",
    maxHeight: "40px",
    minHeight: "40px"
  },
  timeToSendReminder: {
    width: "200px"
  }
};

const enhance = compose(withStyles(styles));
export default enhance(SetReminder);
