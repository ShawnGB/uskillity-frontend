import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import { createReduxStore } from "app:store/createStore";
import AppContainer from "app:containers/AppContainer";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";

const { store, persistor } = createReduxStore();

ReactDOM.render(
  <AppContainer store={store} persistor={persistor} />,
  document.getElementById("root")
);
registerServiceWorker();
