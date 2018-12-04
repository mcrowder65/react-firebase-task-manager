import React from "react";
import { Modal } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "../utils";

class EditReminder extends React.Component {
  static propTypes = {};
  componentDidMount() {}
  render() {
    return <Modal open={true} />;
  }
}

const styles = {};

const enhance = compose(withStyles(styles));
export default enhance(EditReminder);
