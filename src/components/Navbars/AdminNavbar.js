import React from "react";
import classNames from "classnames";
import Searchbar from "../uilibrary/Searchbar";
import Icon from "../uilibrary/Icon";
import { NavLink, withRouter } from "react-router-dom";
import tinycolor from "tinycolor2";

class AdminNavbar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      selectedPage: null,
      color: "navbar-transparent",
    };
    this.generateMenuItems = this.generateMenuItems.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
    this.setState({ selectedPage: this.props.location.pathname });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }
  componentDidUpdate(prevProps) {
    let newLoc = this.props.location.pathname;
    let oldLoc = prevProps.location.pathname;
    if (newLoc != oldLoc) {
      if (newLoc.includes(oldLoc)) {
        this.setState({ selectedPage: oldLoc });
      } else {
        this.setState({ selectedPage: newLoc });
      }
    }
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white",
      });
    } else {
      this.setState({
        color: "navbar-transparent",
      });
    }
  };
  // this function opens and closes the collapse on small devices
  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent",
      });
    } else {
      this.setState({
        color: "bg-white",
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };
  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch,
    });
  };
  generateMenuItems() {
    if (this.props.routes == null || this.props.routes.length <= 0) {
      return null;
    }
    let menus = [];
    let showSubmenu = [];
    if (this.props.layout === "TOP_NAVIGATION") {
      menus = this.props.routes.map((menuItem, i) => {
        showSubmenu[i] =
          this.props.submenuConfig === "TNS" && menuItem.submenu.length > 0;
        return (
          <li
            className={`nav-item ${showSubmenu[i] ? "dropdown" : null}`}
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

              <span>{menuItem.title}</span>
            </NavLink>

            {showSubmenu[i] ? (
              <>
                <span className="caret"></span>
                <div className="dropdown-menu dropdown-navbar">
                  <div className="d-flex">
                    <ul>
                      {menuItem.submenu.map((subItem, i) => (
                        <NavLink
                          to={`/editproject${subItem.path}`}
                          className="nav-item dropdown-item"
                          activeClassName="active"
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
              </>
            ) : null}
          </li>
        );
      });
    } else {
      if (this.props.submenuConfig !== "SNS") {
        let pageOptn = this.props.routes.filter(
          (item, i) => `/editproject${item.path}` == this.state.selectedPage
        )[0];
        menus =
          pageOptn == undefined
            ? []
            : pageOptn.submenu.map((menuItem, i) => {
                return (
                  <NavLink
                    to={`/editproject${menuItem.path}`}
                    className="nav-link"
                    activeClassName="active"
                    key={i}
                  >
                    <Icon iconObj={menuItem.icon} />

                    <span>{menuItem.title}</span>
                  </NavLink>
                );
              });
      }
    }
    return menus;
  }
  render() {
    const { searchbarConfig } = this.props;
    return (
      <nav
        className="navbar-absolute  navbar navbar-expand-lg px-0"
        data-theme={
          tinycolor(this.props.navbarBgColor).isDark() ? "dark" : "light"
        }
        data-template={this.props.template}
        data-rounded={this.props.rounded}
        data-linktemplate={this.props.linktemplate}
        style={{ background: this.props.navbarBgColor }}
      >
        <div className="container-fluid px-0">
          <div className="navbar-wrapper">
            <div className={"navbar-toggle d-inline"}>
              <button
                className="navbar-toggler"
                type="button"
                onClick={this.props.toggleSidebar}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <a className="navbar-brand" onClick={(e) => e.preventDefault()}>
              <div className="brand-img d-flex align-items-center h-100">
                <img src={this.props.logo} alt="react-logo" />
                {/* {this.props.brandText} */}
              </div>
            </a>
          </div>
          <button
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navigation"
            data-toggle="collapse"
            id="navigation"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <div
            className={`collapse navbar-collapse ${
              this.state.collapseOpen ? "show" : null
            }`}
          >
            <ul className="navbar-nav page-nav">
              {this.generateMenuItems()}
              {searchbarConfig.placement === "LEFT" && (
                <Searchbar config={searchbarConfig} />
              )}
            </ul>
            <ul className="ml-auto form-inline navbar-nav">
              {searchbarConfig.placement === "RIGHT" && (
                <Searchbar config={searchbarConfig} />
              )}

              <li className="dropdown nav-item">
                <a
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                >
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
              <li className="dropdown nav-item">
                <a className="dropdown-toggle nav-link" data-toggle="dropdown">
                  <div className="photo">
                    <img
                      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                      alt="Profile Photo"
                    />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block"></b>
                  <p className="d-lg-none">Log out</p>
                </a>
                <ul className="dropdown-menu dropdown-navbar">
                  <li className="nav-link">
                    <a className="nav-item dropdown-item">Profile</a>
                  </li>
                  <li className="nav-link">
                    <a className="nav-item dropdown-item">Settings</a>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li className="nav-link">
                    <a className="nav-item dropdown-item">Log out</a>
                  </li>
                </ul>
              </li>
              <li className="separator d-lg-none" />
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
const AdminNavbarHist = withRouter(AdminNavbar);
export default AdminNavbarHist;
