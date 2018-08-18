import React from "react";
import PropTypes from "prop-types";

import { getUser } from "../utils/firebase-utils";

const { Provider, Consumer } = React.createContext();

class StateProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  state = {
    fetchCount: 0,
    currentUser: null
  };

  startFetching = () => {
    this.setState(state => {
      return {
        fetchCount: state.fetchCount + 1
      };
    });
  };
  stopFetching = () => {
    this.setState(state => {
      return {
        fetchCount: state.fetchCount - 1
      };
    });
  };
  refreshCurrentUser = async () => {
    const currentUser = await getUser();
    this.setState({ currentUser: currentUser || {} });
  };
  isFetching = () => {
    return this.state.fetchCount > 0;
  };
  async componentDidMount() {
    await this.refreshCurrentUser();
  }
  render() {
    return (
      <Provider
        value={{
          isFetching: this.isFetching(),
          startFetching: this.startFetching,
          stopFetching: this.stopFetching,
          refreshCurrentUser: this.refreshCurrentUser,
          currentUser: this.state.currentUser
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export const withStateProps = YourComponent => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {context => <YourComponent {...context} {...this.props} />}
        </Consumer>
      );
    }
  };
};

export { StateProvider };
