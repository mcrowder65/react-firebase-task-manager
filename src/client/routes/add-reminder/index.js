import React from "react";
import PropTypes from "prop-types";
import { TextField, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import LoaderCard from "../../components/reusable/loader-card";
import { compose } from "../../utils";

class AddReminder extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  };
  static defaultProps = {
    isFetching: false
  };
  render() {
    return (
      <LoaderCard
        isFetching={this.props.isFetching}
        className={this.props.classes.card}
      >
        <form className={this.props.classes.content}>
          <div>
            <Typography variant="title">Reminder content</Typography>
          </div>
          <div>
            <TextField required label="Receiving email account" />
          </div>
          <div>
            <Typography variant="body2">Day of Week</Typography>
          </div>
          <div>
            <Typography variant="body2">Date Picker</Typography>
          </div>
          <div>
            <TextField required label="Time to send reminder" />
          </div>
          <div>
            <TextField required label="Subject" />
          </div>
          <div>
            <TextField label="Body" />
          </div>
          <div>
            <Button variant="raised" color="primary">
              Set reminder
            </Button>
          </div>
        </form>
      </LoaderCard>
    );
  }
}

const styles = {
  card: {
    height: "65vh"
  },

  content: {
    height: "100%",
    width: "100%",
    justifyContent: "space-around",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  }
};

const enhance = compose(withStyles(styles));
export default enhance(AddReminder);
