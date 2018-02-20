import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import PropTypes from "prop-types";
import Routes from "app:routes";
import "./AppContainer.css"

class AppContainer extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { store, persistor } = this.props;

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}

export default AppContainer;
