import React from "react";
import PropTypes from "prop-types";
import { Card, LinearProgress } from "@material-ui/core";

class LoaderCard extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isFetching: PropTypes.bool.isRequired
  };

  render() {
    const { isFetching, children, ...props } = this.props;
    return (
      <Card {...props}>
        {isFetching ? <LinearProgress /> : null}
        {children}
      </Card>
    );
  }
}

export default LoaderCard;
