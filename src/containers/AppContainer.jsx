import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { StripeProvider } from 'react-stripe-elements';
import PropTypes from "prop-types";
import Routes from "app:routes";
import "./AppContainer.css"

const STRIPE_API_KEY = process.env.STRIPE_API_KEY;

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
          <StripeProvider apiKey={STRIPE_API_KEY}>
            <Routes />
          </StripeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default AppContainer;
