import React from "react";
import PropTypes from "prop-types";
import { Card, LinearProgress } from "@material-ui/core";

import { StateProps } from "../state-utils";

class LoaderCard extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    return (
      <div>
        <StateProps>
          {context => (context.isFetching ? <LinearProgress /> : null)}
        </StateProps>
        <Card {...this.props}>{this.props.children}</Card>
      </div>
    );
  }
}

export default LoaderCard;
