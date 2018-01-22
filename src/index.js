import React from "react";
import ReactDOM from "react-dom";
import { createReduxStore } from "app:store/createStore";
import AppContainer from "app:containers/AppContainer";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";

let store = createReduxStore();

ReactDOM.render(
  <AppContainer store={store} />,
  document.getElementById("root")
);
registerServiceWorker();
