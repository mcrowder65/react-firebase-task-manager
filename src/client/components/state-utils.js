import React from "react";
import PropTypes from "prop-types";

const { Provider, Consumer } = React.createContext();

class StateProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  state = {
    fetchCount: 0
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

  isFetching = () => {
    return this.state.fetchCount > 0;
  };

  render() {
    return (
      <Provider
        value={{
          isFetching: this.isFetching(),
          startFetching: this.startFetching,
          stopFetching: this.stopFetching
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
