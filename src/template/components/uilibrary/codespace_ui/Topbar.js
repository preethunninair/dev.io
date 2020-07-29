import React, { useState } from "react";
import { useSelector } from "react-redux";
import tinycolor from "tinycolor2";
import { NavLink as RouterLink } from "react-router-dom";
import Icon from "../Icon";

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
  NavItem,
  Nav,
  Container,
  Modal,
} from "reactstrap";

function Topbar(props) {
  const templateConfig = useSelector((state) => state.templateConfig.config);
  const [collapseOpen, setCollapseOpen] = useState(false);

  function generateMenuItems() {
    if (
      (templateConfig.layout.indexOf("SIDE") > -1 &&
        templateConfig.submenuConfig != "TNS") ||
      props.routes == null ||
      props.routes.length <= 0
    ) {
      return null;
    }
    let menus = [];
    menus = props.routes.map((menuItem, i) => {
      if (
        menuItem.submenu.length > 0 &&
        templateConfig.submenuConfig == "DSM"
      ) {
        return (
          <UncontrolledDropdown nav>
            <DropdownToggle caret color="default" data-toggle="dropdown" nav>
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

  if (templateConfig.sidenavOnly !== "TRUE") {
    return (
      <div className="app-topnav">
        <nav
          className="navbar navbar-expand-lg px-0 position-absolute"
          data-theme={
            tinycolor(templateConfig.topnavBgColor).isDark() ? "dark" : "light"
          }
          data-enableshadow={templateConfig.enableTopnavShadow}
          data-template={templateConfig.template}
          data-rounded={templateConfig.rounded}
          data-linktemplate={templateConfig.topnavlinktemplate}
          data-secondarynavsize={templateConfig.secondarynavsize}
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
              {/* <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                {props.brandContent}
              </NavbarBrand> */}
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
