import React, { useState } from "react";
import { useSelector } from "react-redux";
import tinycolor from "tinycolor2";
import { NavLink } from "react-router-dom";
import Icon from "../Icon";

function Topbar(props) {
  const templateConfig = useSelector((state) => state.templateConfig.config);
  const [collapseOpen, setCollapseOpen] = useState(false);

  function generateMenuItems() {
    if (props.routes == null || props.routes.length <= 0) {
      return null;
    }
    let menus = [];
    let showSubmenu = [];
    if (templateConfig.layout === "TOP_NAVIGATION") {
      menus = props.routes.map((menuItem, i) => {
        showSubmenu[i] =
          templateConfig.submenuConfig === "TNS" && menuItem.submenu.length > 0;
        return (
          <li
            className={`nav-item ${showSubmenu[i] ? "dropdown" : ""}`}
            key={i}
          >
            <NavLink
              to={`${props.baseURL}${menuItem.path}`}
              className={`nav-link ${showSubmenu[i] ? "dropdown-toggle" : ""}`}
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
              <div className="dropdown-menu dropdown-navbar">
                <div className="d-flex">
                  <ul className="list-unstyled w-100">
                    {menuItem.submenu.map((subItem, i) => (
                      <li className={`nav-item`} key={i}>
                        <NavLink
                          to={`${props.baseURL}${subItem.path}`}
                          className="nav-link dropdown-item"
                          activeClassName="active"
                          onClick={() => {
                            var current = document.querySelectorAll(
                              ".dropdown-menu.show"
                            );
                            if (current.length > 0) {
                              current[0].className = current[0].className.replace(
                                " show",
                                ""
                              );
                            }
                          }}
                        >
                          <Icon iconObj={subItem.icon} />
                          {subItem.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </li>
        );
      });
    } else {
      if (
        templateConfig.submenuConfig !== "SNS" &&
        templateConfig.submenuConfig !== "SNB"
      ) {
        menus = props.routes.map((menuItem, i) => {
          return (
            <li className="nav-item" key={i}>
              <NavLink
                to={`${props.baseURL}${menuItem.path}`}
                className="nav-link"
                activeClassName="active"
              >
                <Icon iconObj={menuItem.icon} />

                <span>{menuItem.title}</span>
              </NavLink>
            </li>
          );
        });
      }
    }
    return menus;
  }

  if (templateConfig.sidenavOnly !== "TRUE") {
    return (
      <div className="app-header">
        <nav
          className="navbar navbar-expand-lg px-0 position-absolute"
          data-theme={
            tinycolor(templateConfig.topnavBgColor).isDark() ? "dark" : "light"
          }
          data-enableshadow={templateConfig.enableTopnavShadow}
          data-template={templateConfig.template}
          data-rounded={templateConfig.rounded}
          data-linktemplate={templateConfig.topnavlinktemplate}
          style={{ background: templateConfig.topnavBgColor }}
        >
          <div className="container-fluid px-0">
            <div className="navbar-wrapper">
              <div className={"navbar-toggle d-inline"}>
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={templateConfig.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
            </div>
            <button
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navigation"
              data-toggle="collapse"
              id="navigation"
              type="button"
              onClick={() => setCollapseOpen(!collapseOpen)}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <div
              className={`collapse navbar-collapse ${
                collapseOpen ? "show" : ""
              }`}
            >
              <ul
                className="navbar-nav page-nav"
                style={
                  templateConfig.topnavSecondaryBgColor !== "NA"
                    ? { background: templateConfig.topnavSecondaryBgColor }
                    : {}
                }
              >
                {generateMenuItems()}
                {props.pageNav}
              </ul>
              <ul className="ml-auto form-inline navbar-nav">
                {props.navItems}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  return null;
}
export default Topbar;
