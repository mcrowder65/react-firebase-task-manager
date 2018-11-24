import React from "react";
import PropTypes from "prop-types";
import {Modal} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";


import { compose } from "../utils";
import { WithApiCall } from "../components/state-utils";

class EditReminder extends React.Component {
  static propTypes = {
  
  }
  componentDidMount() {
  
  }
  render() {
    return (
      <Modal open={true}>
      
      </Modal>
    )
  }
}

const styles = {};

const enhance = compose(withStyles(styles));
export default enhance(EditReminder);
