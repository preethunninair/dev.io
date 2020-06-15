import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../uilibrary/Icon";
import tinycolor from "tinycolor2";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.generateMenuItems = this.generateMenuItems.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   ps = new PerfectScrollbar(this.refs.sidebar, {
    //     suppressScrollX: true,
    //     suppressScrollY: false
    //   });
    // }
  }
  componentWillUnmount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   ps.destroy();
    // }
  }
  aOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  generateMenuItems() {
    let menus = [];
    let showSubmenu = [];
    if (this.props.layout === "SIDE_NAVIGATION") {
      menus = this.props.routes.map((menuItem, i) => {
        showSubmenu[i] =
          this.props.submenuConfig === "SNS" && menuItem.submenu.length > 0;
        return (
          <li
            className={`nav-item${showSubmenu[i] ? " dropdown" : ""}`}
            key={i}
          >
            <NavLink
              to={`/editproject${menuItem.path}`}
              className="dropdown-toggle nav-link"
              data-toggle="dropdown"
              activeClassName="active"
              onClick={(e) => {
                if (showSubmenu[i]) {
                  e.preventDefault();
                }
              }}
            >
              <Icon iconObj={menuItem.icon} />

              <p>{menuItem.title}</p>
            </NavLink>

            {showSubmenu[i] ? (
              <div className="dropdown-menu dropdown-navbar menu-right">
                <div className="d-flex">
                  <ul className="p-0">
                    {menuItem.submenu.map((subItem, i) => (
                      <NavLink
                        to={`/editproject${subItem.path}`}
                        className="nav-item dropdown-item"
                        activeClassName="active"
                        key={i}
                        onClick={() => {
                          var current = document.querySelectorAll("li.show");
                          if (current.length > 0) {
                            current[0].className = current[0].className.replace(
                              " show",
                              ""
                            );
                          }
                        }}
                      >
                        {subItem.title}
                      </NavLink>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </li>
        );
      });
    }
    return menus;
  }
  render() {
    const {
      routes,
      rtlActive,
      logo,
      template,
      layout,
      showToggler,
      theme,
    } = this.props;

    return (
      <div
        className="sidebar"
        style={{ background: this.props.sidebarBgColor }}
        data-theme={
          tinycolor(this.props.sidebarBgColor).isDark() ? "dark" : "light"
        }
        data-submenuconfig={this.props.submenuConfig}
        data-rounded={this.props.rounded}
        data-linktemplate={this.props.linktemplate}
        data-template={template}
      >
        <div className="sidebar-wrapper" ref="sidebar">
          {logo && logo.imgSrc !== null ? (
            <div className="logo">
              <div className="logo-img">
                <img src={logo.imgSrc} alt="react-logo" />
              </div>
            </div>
          ) : null}
          {showToggler ? (
            <div className="toggler" onClick={this.props.toggleLayout}>
              <i className="fa fa-align-right" aria-hidden="true"></i>
            </div>
          ) : null}

          <ul className="nav">{this.generateMenuItems()}</ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
