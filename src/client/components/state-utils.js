import React from "react";
import PropTypes from "prop-types";

import { getUserFromFirebase } from "../services/firebase-service";

const { Provider, Consumer } = React.createContext();

export class StateProvider extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  state = {
    fetchCount: 0,
    currentUser: null,
  };

  startFetching = () => {
    this.setState((state) => {
      return {
        fetchCount: state.fetchCount + 1,
      };
    });
  };
  stopFetching = () => {
    this.setState((state) => {
      return {
        fetchCount: state.fetchCount - 1,
      };
    });
  };
  refreshCurrentUser = async () => {
    const currentUser = await getUserFromFirebase();
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
          currentUser: this.state.currentUser,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
export const StateProps = (props) => (
  <Consumer>{(context) => <SubComponent {...props} {...context} />}</Consumer>
);

class SubComponent extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    startFetching: PropTypes.func.isRequired,
    stopFetching: PropTypes.func.isRequired,
  };
  networkRequest = async (func) => {
    try {
      this.props.startFetching();
      await func();
    } finally {
      this.props.stopFetching();
    }
  };
  render() {
    return this.props.children({
      ...this.props,
      networkRequest: this.networkRequest,
    });
  }
}
export const withStateProps = (YourComponent) => {
  return class extends React.Component {
    render() {
      return (
        <Consumer>
          {(context) => <YourComponent {...context} {...this.props} />}
        </Consumer>
      );
    }
  };
};

export const withApiCall = (YourComponent) => {
  return class extends React.Component {
    state = {
      isFetching: false,
    };
    apiCall = async (yourApiCall) => {
      try {
        this.setState({ isFetching: true });
        const result = await yourApiCall();
        return result;
      } catch (e) {
        throw e;
      } finally {
        this.setState({ isFetching: false });
      }
    };
    render() {
      return (
        <YourComponent
          {...this.props}
          isFetching={this.state.isFetching}
          apiCall={this.apiCall}
        />
      );
    }
  };
};
export class WithApiCall extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };
  state = {
    isFetching: false,
  };
  apiCall = async (yourApiCall) => {
    try {
      this.setState({ isFetching: true });
      const result = await yourApiCall();
      return result;
    } catch (e) {
      throw e;
    } finally {
      if (this._isMounted) {
        this.setState({ isFetching: false });
      }
    }
  };
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return this.props.children({
      ...this.props,
      isFetching: this.state.isFetching,
      apiCall: this.apiCall,
    });
  }
}
