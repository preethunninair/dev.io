import React, { Suspense, lazy } from "react";

import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import tinycolor from "tinycolor2";
import logo_white from "../../assets/img/logo_white.png";
import logo_black from "../../assets/img/logo_black.png";
import { Card } from "reactstrap";
import Demo from "../Demo";
import SubRouteDispatcher from "../../components/SubRouteDispatcher";
import { connect } from "react-redux";

const mapState = (store) => ({
  subRoute: store.routerReducer.subRoute,
});
class TemplateView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.config == undefined) {
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
      sideBgHighlightColor,
      navBgHighlightColor,
      navTextHighlightColor,
      sideTextHighlightColor,
      appBgColor,
      floatingMenu,
      logoOnNav,
    } = this.props.config;

    const { MENUDATA } = this.props;
    let sidebarHighlightStyling = "";
    let topbarHighlightStyling = "";

    if (navbarlinktemplate.indexOf("LT0") > -1) {
      if (navTextHighlightColor !== undefined) {
        topbarHighlightStyling += `.navbar .navbar-nav li a.active > span, .navbar .navbar-nav li a.active > i{
          color:${navTextHighlightColor} !important;

        } `;
      }
    } else {
      if (navBgHighlightColor !== undefined) {
        topbarHighlightStyling += `
        .navbar .navbar-collapse .navbar-nav.page-nav .nav-link.active{
          background:${navBgHighlightColor} !important;
        
        }`;
      }
      if (navTextHighlightColor !== undefined) {
        topbarHighlightStyling += `.navbar .navbar-nav li a.active > span, .navbar .navbar-nav li a.active > i{
          color:${navTextHighlightColor} !important;
        }
        `;
      }
    }

    if (sidebarlinktemplate.indexOf("LT0") > -1) {
      if (sideTextHighlightColor !== undefined) {
        sidebarHighlightStyling += `.sidebar .nav li > a.active{
          color:${sideTextHighlightColor} !important;
        }`;
      }
    } else {
      if (sideBgHighlightColor !== undefined) {
        sidebarHighlightStyling += `.sidebar .nav li > a.active{
          background:${sideBgHighlightColor} !important;
        
        }`;
      }
      if (sideTextHighlightColor !== undefined) {
        sidebarHighlightStyling += `.sidebar .nav li > a.active p,.sidebar .nav li > a.active i{
          color:${sideTextHighlightColor} !important;
        }
        `;
      }
    }
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
          data-logoonnav={logoOnNav}
          data-boxed={boxed}
          data-layout={layout}
          data-rounded={rounded}
          data-grid={gridConfig}
        >
          {/* {layout == "SIDE_NAVIGATION" || layout == "SIDEONLYNAVIGATION" ? ( */}
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
          {/* ) : null} */}
          {layout != "SIDEONLYNAVIGATION" ? (
            <div className="app-header">
              <AdminNavbar
                routes={
                  layout == "TOP_NAVIGATION" ? MENUDATA : this.props.subRoute
                }
                layout={layout}
                linktemplate={navbarlinktemplate}
                searchbarConfig={searchbarConfig}
                submenuConfig={submenuConfig}
                theme={navbarTheme}
                navbarBgColor={navbarBgColor}
                logo={
                  !tinycolor(navbarBgColor).isDark() ? logo_black : logo_white
                }
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
            <div className="scroller">
              <Switch>
                {MENUDATA.map((route, i) => {
                  return (
                    <Route
                      key={i}
                      path={`/createproject${route.path}`}
                      render={(props) => (
                        <SubRouteDispatcher
                          parentRoute={`/createproject${route.path}`}
                          routes={route.submenu}
                        >
                          <Demo {...props} path={route.path} />
                        </SubRouteDispatcher>
                      )}
                    />
                  );
                })}
              </Switch>
            </div>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
         ${sidebarHighlightStyling}
         ${topbarHighlightStyling}
          `,
            //sidehighlightBgColor
          }}
        />
      </div>
    );
  }
}
export default connect(mapState)(TemplateView);
