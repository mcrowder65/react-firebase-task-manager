import React from "react";
import PropTypes from "prop-types";
import { Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "lodash/fp";

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: 300,
    height: 300
  }
};
class Login extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <Card className={classes.card}>Hello!</Card>
      </div>
    );
  }
}

const enhance = compose(withStyles(styles));

export default enhance(Login);
