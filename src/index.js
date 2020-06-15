import React from "react";
import ReactDOM from "react-dom";
import { createHashHistory } from "history";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import CreateProject from "./views/CreateProject";
import EditProject from "./views/EditProject";
import AppContainer from "./AppContainer";
import store from "./store";

import "./assets/css/styles.css";

import * as serviceWorker from "./serviceWorker";

const hist = createHashHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Route path="/" render={(props) => <AppContainer {...props} />} />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
