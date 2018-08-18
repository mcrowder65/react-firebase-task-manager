import React from "react";
import PropTypes from "prop-types";
import { Card, LinearProgress } from "@material-ui/core";

import { compose } from "../../utils";
import { withStateProps } from "../state-utils";

class LoaderCard extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired
  };

  render() {
    const {
      classes,
      isFetching,
      stopFetching,
      startFetching,
      currentUser,
      refreshCurrentUser,
      ...otherProps
    } = this.props;
    return (
      <div>
        {isFetching ? <LinearProgress /> : null}
        <Card {...otherProps}>{this.props.children}</Card>
      </div>
    );
  }
}

const enhance = compose(withStateProps);
export default enhance(LoaderCard);
