import React from "react";
import ReactDOM from "react-dom";
import { createHashHistory } from "history";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import CreateProject from "./views/CreateProject";
import store from "./store";

import "./assets/css/styles.css";

import * as serviceWorker from "./serviceWorker";

const hist = createHashHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Route
        path="/"
        exact
        render={(props) => <Redirect from="/" to="/createproject" />}
      />
      <Route
        path="/createproject"
        render={(props) => <CreateProject {...props} />}
      />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
