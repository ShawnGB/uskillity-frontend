import React from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import Routes from "app:routes";

class AppContainer extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Routes/>
      </Provider>
    );
  }
}

export default AppContainer;
