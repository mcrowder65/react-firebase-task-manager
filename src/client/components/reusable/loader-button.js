import React from "react";
import PropTypes from "prop-types";
import { Button, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { compose } from "../../utils";

function LoaderButton(props) {
  const { children, isFetching, classes, circleSize, ...otherProps } = props;
  return (
    <Button {...otherProps} disabled={isFetching === true}>
      {children}
      {isFetching ? (
        <CircularProgress size={circleSize} className={classes.loader} />
      ) : null}
    </Button>
  );
}

LoaderButton.propTypes = {
  children: PropTypes.node.isRequired,
  isFetching: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  circleSize: PropTypes.number
};

LoaderButton.defaultProps = {
  isFetching: true,
  circleSize: 30
};
const styles = {
  loader: {
    position: "absolute"
  }
};

const enhance = compose(withStyles(styles));
export default enhance(LoaderButton);
