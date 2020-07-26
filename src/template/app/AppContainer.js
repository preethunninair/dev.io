import React from "react";
import { Switch, Route } from "react-router-dom";
import Icon from "../components/uilibrary/Icon";
import tinycolor from "tinycolor2";

import logo_white from "../assets/img/logo_white.png";
import logo_black from "../assets/img/logo_black.png";

// core components
import Topbar from "../components/uilibrary/dev.io_ui/Topbar";
import Sidebar from "../components/uilibrary/dev.io_ui/Sidebar";
import Content from "../components/uilibrary/dev.io_ui/Content";
import BrandLogo from "../components/uilibrary/dev.io_ui/BrandLogo";
import Layout from "../components/uilibrary/dev.io_ui/Layout";
import { connect } from "react-redux";
import SubRouteDispatcher from "../components/uilibrary/dev.io_ui/SubRouteDispatcher";

const mapState = (store) => ({
  subRoute: store.routerReducer.subRoute,
  routes: store.routerReducer.routes,
  templateConfig: store.templateConfig.config,
});
class AppContainer extends React.PureComponent {
  render() {
    return (
      <Layout wrapperClass="h-100">
        <BrandLogo
          brandContent={
            <h4 class="m-0">
              [_x<span class="text-danger">Lab]</span>
            </h4>
          }
        />
        <Topbar
          baseURL={this.props.baseURL}
          brandContent={
            <h4 class="m-0">
              [_x<span class="text-danger">Lab]</span>
            </h4>
          }
          routes={
            this.props.templateConfig.layout === "TOP_NAVIGATION"
              ? this.props.routes
              : this.props.subRoute
          }
          navItems={
            <>
              <li className="nav-item">
                <a className="nav-link">
                  <Icon
                    style={{ fontSize: "24px" }}
                    iconObj={{
                      family: "material-icon",
                      name: "search",
                    }}
                  />
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link position-relative">
                  <div className="notification d-none d-lg-block d-xl-block" />
                  <Icon
                    style={{ fontSize: "24px" }}
                    iconObj={{
                      family: "material-icon",
                      name: "notifications_none",
                    }}
                  />
                  <p className="d-lg-none">Notifications</p>
                </a>
              </li>
              <li className="dropdown dropleft nav-item">
                <a className="dropdown-toggle nav-link" data-toggle="dropdown">
                  <Icon
                    style={{ fontSize: "24px" }}
                    iconObj={{
                      family: "material-icon",
                      name: "account_circle",
                    }}
                  />

                  <p className="d-lg-none">Log out</p>
                </a>
                <div className="dropdown-menu dropdown-navbar">
                  <a className="dropdown-item">Profile</a>

                  <a className="dropdown-item">Settings</a>

                  <div className="dropdown-divider"></div>

                  <a className="dropdown-item">Log out</a>
                </div>
              </li>
              <li className="separator d-lg-none" />
            </>
          }
        />
        <Sidebar
          baseURL={this.props.baseURL}
          routes={
            this.props.templateConfig.layout === "SIDE_NAVIGATION"
              ? this.props.routes
              : this.props.subRoute
          }
        />
        <Content>
          <Switch>
            {this.props.routes.map((route, i) => {
              return (
                <Route
                  key={i}
                  path={`${this.props.baseURL}${route.path}`}
                  render={(props) => (
                    <SubRouteDispatcher
                      baseURL={this.props.baseURL}
                      parentRoute={`${route.path}`}
                      routes={route.submenu}
                    >
                      <h1></h1>
                    </SubRouteDispatcher>
                  )}
                />
              );
            })}
          </Switch>
        </Content>
      </Layout>
    );
  }
}
export default connect(mapState)(AppContainer);
