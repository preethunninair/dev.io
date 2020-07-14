import React from "react";
import { useSelector } from "react-redux";
import tinycolor from "tinycolor2";
import { NavLink } from "react-router-dom";
import Icon from "../Icon";
import { UncontrolledCollapse } from "reactstrap";

function Sidebar(props) {
  const templateConfig = useSelector((state) => state.templateConfig.config);
  if (templateConfig.layout === "TOP_NAVIGATION" && props.routes.length <= 0) {
    return null;
  }

  function generateMenuItems() {
    if (props.routes === undefined || props.routes.length <= 0) {
      return null;
    }
    let menus = [];
    let showSubMenu = [];
    if (templateConfig.layout === "SIDE_NAVIGATION") {
      menus = props.routes.map((menuItem, i) => {
        showSubMenu[i] =
          (templateConfig.submenuConfig === "SNS" ||
            templateConfig.submenuConfig === "SNB") &&
          menuItem.submenu.length > 0;

        return (
          <li
            className={`nav-item${
              showSubMenu[i] && templateConfig.submenuConfig === "SNS"
                ? " dropdown dropright"
                : ""
            }`}
            key={i}
          >
            <NavLink
              to={{
                pathname: `${props.baseURL}${menuItem.path}`,
                state: { parentModule: menuItem.path },
              }}
              className={`nav-link ${
                showSubMenu[i] && templateConfig.submenuConfig === "SNS"
                  ? "dropdown-toggle"
                  : ""
              }`}
              data-toggle="dropdown"
              activeClassName="active"
              id={menuItem.module}
              onClick={(e) => {
                if (showSubMenu[i]) {
                  e.preventDefault();
                } else {
                  // if (templateConfig.submenuConfig === "SNB") {
                  //   var current = document.querySelectorAll(
                  //     ".collapse-menu-item.show"
                  //   );
                  //   if (current.length > 0) {
                  //     current[0].className = current[0].className.replace(
                  //       " show",
                  //       ""
                  //     );
                  //   }
                  // }
                }
              }}
            >
              <Icon iconObj={menuItem.icon} />

              <p>{menuItem.title}</p>
            </NavLink>

            {showSubMenu[i] && templateConfig.submenuConfig === "SNS" ? (
              <div className="dropdown-menu dropdown-navbar">
                {menuItem.submenu.map((subItem, i) => (
                  <NavLink
                    to={`${props.baseURL}${subItem.path}`}
                    key={i}
                    className="dropdown-item"
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
                ))}
              </div>
            ) : null}
            {showSubMenu[i] && templateConfig.submenuConfig === "SNB" ? (
              <UncontrolledCollapse
                className="collapse-menu-item w-100"
                toggler={`#${menuItem.module}`}
              >
                <div className="d-flex">
                  <ul className="p-0 w-100">
                    {menuItem.submenu.map((subItem, i) => (
                      <li className={`nav-item`} key={i}>
                        <NavLink
                          to={`${props.baseURL}${subItem.path}`}
                          className="nav-link"
                          activeClassName="active"
                        >
                          <Icon iconObj={subItem.icon} />
                          {subItem.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </UncontrolledCollapse>
            ) : null}
          </li>
        );
      });
    }
    return menus;
  }

  if (templateConfig.layout === "SIDE_NAVIGATION") {
    return (
      <div className="app-menu">
        <div
          className="sidebar"
          style={{ background: templateConfig.sidenavBgColor }}
          data-theme={
            tinycolor(templateConfig.sidenavBgColor).isDark() ? "dark" : "light"
          }
          data-submenuconfig={templateConfig.submenuConfig}
          data-enableshadow={templateConfig.enableSidenavShadow}
          data-rounded={templateConfig.rounded}
          data-linktemplate={templateConfig.sidenavlinktemplate}
          data-template={templateConfig.template}
        >
          <div className="sidebar-wrapper">
            <ul
              className={`nav page-nav ${
                templateConfig.sidenavMenuAlignCenter !== "FALSE"
                  ? "center"
                  : ""
              }`}
            >
              {generateMenuItems()}
              {props.menuItems}
            </ul>
            <ul className="action-items">{props.actionItems}</ul>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
export default Sidebar;
