import React from "react";
import ReactDOM from "react-dom";
//import { createStore } from "redux";
import AppContainer from "app:containers/AppContainer";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";

let store; // = createStore();

ReactDOM.render(
  <AppContainer store={store} />,
  document.getElementById("root")
);
registerServiceWorker();
