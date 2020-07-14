import React from "react";
import {
  Route,
  Switch,
  HashRouter as Router,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { createHashHistory } from "history";
import CreateProject from "../views/CreateProject";
import Welcome from "../views/Welcome";

class App extends React.PureComponent {
  render() {
    const hist = createHashHistory();

    return (
      <Router history={hist}>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Redirect from="/" to="/welcome" />}
          />
          <Route exact path="/welcome">
            <Welcome />
          </Route>

          <Route path="/createproject">
            <CreateProject />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default connect()(App);
