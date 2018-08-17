import React from "react";
import PropTypes from "prop-types";
import { Card, LinearProgress } from "@material-ui/core";
import { compose } from "lodash/fp";
import { withStyles } from "@material-ui/core/styles";

import { withStateProps } from "../state-utils";

const styles = {
  content: {
    display: "flex",
    flexDirection: "column"
  }
};
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
      ...otherProps
    } = this.props;
    return (
      <div>
        {isFetching ? (
          <div className={classes.loader}>
            <LinearProgress />
          </div>
        ) : null}
        <Card {...otherProps}>{this.props.children}</Card>
      </div>
    );
  }
}

const enhance = compose(
  withStateProps,
  withStyles(styles)
);
export default enhance(LoaderCard);
