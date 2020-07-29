import React from "react";
import { setSubRoute } from "../../../redux/actions/routerActions";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
class SubRouteDispatcher extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(setSubRoute(this.props.routes));
  }
  render() {
    const { routes, parentRoute } = this.props;
    if (routes.length > 0) {
      return (
        <>
          <Switch>
            {routes.map((route, i) => {
              return (
                <Route
                  key={i}
                  path={`${this.props.baseURL}${route.path}`}
                  render={(props) => <h1></h1>}
                />
              );
            })}
            <Route
              path={`${this.props.baseURL}${parentRoute}`}
              render={(props) => (
                <Redirect
                  from={`${this.props.baseURL}${parentRoute}`}
                  to={`${this.props.baseURL}${routes[0].path}`}
                />
              )}
            />
          </Switch>
          {/* {this.props.children} */}
        </>
      );
    }
    return this.props.children;
  }
}
export default connect()(SubRouteDispatcher);
