import React from "react";

import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import { Switch, Route } from "react-router-dom";
import tinycolor from "tinycolor2";
import logo_white from "../../assets/img/logo_white.png";
import logo_black from "../../assets/img/logo_black.png";
import { Card } from "reactstrap";
function TemplateView(props) {
  if (props.config == undefined) {
    return null;
  }

  const {
    navbarTheme,
    sidebarTheme,
    sidebarlinktemplate,
    navbarlinktemplate,
    logoTheme,

    padded,
    boxed,
    layout,
    rounded,
    gridConfig,
    searchbarConfig,
    submenuConfig,
    selectedPage,
    linktemplate,
    template,

    navbarsize,
    sidebarsize,
    logoBgColor,
    navbarBgColor,
    sidebarBgColor,
    sidehighlightBgColor,
    navhighlightBgColor,
    appBgColor,
    floatingMenu,
  } = props.config;
  const { MENUDATA } = props;
  return (
    <div
      className="wrapper h-100"
      style={{ background: appBgColor }}
      data-appmode={tinycolor(appBgColor).isDark() ? "dark" : "light"}
    >
      <div
        className="app-container"
        data-navbarsize={navbarsize}
        data-floatingMenu={floatingMenu}
        data-sidebarsize={sidebarsize}
        data-padded={padded}
        data-boxed={boxed}
        data-layout={layout}
        data-rounded={rounded}
        data-grid={gridConfig}
      >
        {layout == "SIDE_NAVIGATION" || layout == "SIDEONLYNAVIGATION" ? (
          <div className="app-brand d-none d-md-block" data-grid={gridConfig}>
            <div
              className="brand-img h-100"
              style={{ background: logoBgColor }}
              data-theme={logoTheme}
            >
              <img
                src={!tinycolor(logoBgColor).isDark() ? logo_black : logo_white}
                alt="react-logo"
                style={{ width: "100px" }}
              />
              {/* {this.props.brandText} */}
            </div>
          </div>
        ) : null}
        {layout != "SIDEONLYNAVIGATION" ? (
          <div className="app-header">
            <AdminNavbar
              routes={MENUDATA}
              layout={layout}
              linktemplate={navbarlinktemplate}
              searchbarConfig={searchbarConfig}
              submenuConfig={submenuConfig}
              selectedPage={selectedPage}
              theme={navbarTheme}
              navbarBgColor={navbarBgColor}
              logo="./current/logo.png"
              template={template}
            />
          </div>
        ) : null}
        {layout == "SIDE_NAVIGATION" || layout == "SIDEONLYNAVIGATION" ? (
          <div className="app-menu">
            <Sidebar
              routes={MENUDATA}
              submenuConfig={submenuConfig}
              sidebarBgColor={sidebarBgColor}
              theme={sidebarTheme}
              layout={layout}
              selectedPage={selectedPage}
              logo={{
                imgSrc: "https://www.casece.com/PublishingImages/logo.gif",
              }}
              showToggler={false}
              linktemplate={sidebarlinktemplate}
              template={template}
            />
          </div>
        ) : null}

        <div className="app-main" data-rounded={rounded}>
          <Switch>
            {MENUDATA.map((data, i) => (
              <Route
                key={i}
                exact={data.submenu.length == 0}
                path={`/editproject${data.path}`}
                render={(props) => null}
              />
            ))}
            {MENUDATA.filter((item) => item.submenu.length > 0).forEach(
              (menuItem) =>
                menuItem.submenu.map((data, i) => {
                  return (
                    <Route
                      key={i}
                      exact
                      path={`/editproject${data.path}`}
                      render={(props) => null}
                    />
                  );
                })
            )}
          </Switch>
          <div className="scroller"></div>
        </div>
      </div>
      {/* <style
        dangerouslySetInnerHTML={{
          __html: `
          .sidebar .nav li > a.active{
            background:${navhighlightBgColor} !important;
          }
          //sidehighlightBgColor
    `,
        }}
      /> */}
    </div>
  );
}
export default TemplateView;
