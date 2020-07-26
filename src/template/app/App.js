import React from "react";
import {
  Route,
  Switch,
  Redirect,
  HashRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";
import { createHashHistory } from "history";
import AppContainer from "./AppContainer";
import Login from "../views/auth/Login";
import Logout from "../views/auth/Logout";

import { logoutUser } from "../redux/actions/authActions";
const hist = createHashHistory();

const PrivateRoute = ({ dispatch, bypass, component, ...rest }) => {
  if (
    !Login.isAuthenticated(localStorage.getItem("id_token")) &&
    bypass === false
  ) {
    dispatch(logoutUser());
    return <Redirect to="/login" />;
  } else {
    return (
      // eslint-disable-line
      <Route
        {...rest}
        render={(props) =>
          React.createElement(component, { ...props, baseURL: "/app" })
        }
      />
    );
  }
};

class App extends React.Component {
  render() {
    return (
      <Router history={hist}>
        <Switch>
          <Route path="/" exact render={(props) => <Redirect to="/app" />} />
          <Route path="/login" exact render={(props) => <Login />} />
          <Route path="/logout" exact render={(props) => <Logout />} />

          <PrivateRoute
            dispatch={this.props.dispatch}
            path="/app"
            bypass={true}
            component={AppContainer}
          />
        </Switch>
      </Router>
    );
  }
}

export default connect()(App);
