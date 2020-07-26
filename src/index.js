import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Initializer from "./app/Initializer";
import App from "./app/App";
import "./assets/css/styles.css";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <Initializer>
      <App />
    </Initializer>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
