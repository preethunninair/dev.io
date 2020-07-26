import React from "react";
import { useSelector } from "react-redux";
import tinycolor from "tinycolor2";
import { NavLink as RouterLink } from "react-router-dom";
import Icon from "../Icon";
import { UncontrolledCollapse } from "reactstrap";

import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  NavItem,
  Nav,
  Container,
  Modal,
} from "reactstrap";

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
        if (menuItem.submenu.length > 0) {
          if (templateConfig.submenuConfig === "DSM") {
            return (
              <UncontrolledDropdown nav direction="right">
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                >
                  <Icon iconObj={menuItem.icon} />

                  <span>{menuItem.title}</span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  {menuItem.submenu.map((subItem, i) => (
                    <DropdownItem
                      tag={RouterLink}
                      to={`${props.baseURL}${subItem.path}`}
                    >
                      <Icon iconObj={subItem.icon} />

                      <span>{subItem.title}</span>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            );
          } else if (templateConfig.submenuConfig === "SSM") {
            return (
              <>
                <NavItem>
                  <NavLink id={menuItem.module}>
                    <Icon iconObj={menuItem.icon} />

                    <span>{menuItem.title}</span>
                  </NavLink>
                </NavItem>
                <UncontrolledCollapse
                  className="collapse-menu-item my-2 w-100"
                  toggler={`#${menuItem.module}`}
                >
                  <div className="d-flex">
                    <ul className="px-0 py-1 w-100">
                      {menuItem.submenu.map((subItem, i) => (
                        <li className={`nav-item`} key={i}>
                          <RouterLink
                            to={`${props.baseURL}${subItem.path}`}
                            className="nav-link"
                            activeClassName="active"
                          >
                            <Icon iconObj={subItem.icon} />
                            <span> {subItem.title}</span>
                          </RouterLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </UncontrolledCollapse>
              </>
            );
          } else {
            return (
              <NavItem>
                <RouterLink
                  to={`${props.baseURL}${menuItem.path}`}
                  className="nav-link"
                  activeClassName="active"
                >
                  <Icon iconObj={menuItem.icon} />

                  <span>{menuItem.title}</span>
                </RouterLink>
              </NavItem>
            );
          }
        } else {
          return (
            <NavItem>
              <RouterLink
                to={`${props.baseURL}${menuItem.path}`}
                className="nav-link"
                activeClassName="active"
              >
                <Icon iconObj={menuItem.icon} />

                <span>{menuItem.title}</span>
              </RouterLink>
            </NavItem>
          );
        }
      });

      return menus;
    }
  }

  if (templateConfig.layout === "SIDE_NAVIGATION") {
    return (
      <div className="app-sidenav">
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
          <div
            className={`sidebar-wrapper ${
              templateConfig.sidenavMenuAlignCenter !== "FALSE" ? "center" : ""
            }`}
          >
            <ul className="nav page-nav w-100">
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
