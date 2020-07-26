import React from "react";
import { connect } from "react-redux";
import AppContainer from "../../template/app/AppContainer.js";
import Initializer from "../../template/app/Initializer.js";

class TemplateView extends React.Component {
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.config) != JSON.stringify(this.props.config)) {
      this.props.dispatch({
        type: "SET_TEMPLATECONFIG",
        payload: this.props.config,
      });
    }
  }

  render() {
    if (this.props.config === undefined) {
      return null;
    }

    const {
      sidenavActiveLinkBgColor,
      sidenavLinkTextColor,
      sidenavActiveLinkTextColor,
      sidenavActiveLinkIconColor,

      topnavActiveLinkBgColor,
      topnavLinkTextColor,
      topnavActiveLinkTextColor,
      topnavActiveLinkIconColor,
    } = this.props.config;

    let sidenavActiveLinkStyling = "";
    let topnavActiveLinkStyling = "";
    let topnavLinkColorStyling = "";
    let sidenavLinkTextColorStyling = "";
    if (topnavLinkTextColor !== undefined) {
      topnavLinkColorStyling += `.layout-editor .navbar .navbar-nav.page-nav li a:not(.dropdown-item) > span,
   .layout-editor .navbar .navbar-nav.page-nav li a:not(.dropdown-item) > i {
     color: ${topnavLinkTextColor};
   }`;
    }

    if (topnavActiveLinkBgColor !== undefined) {
      topnavActiveLinkStyling += `
        .layout-editor .navbar .navbar-collapse .navbar-nav.page-nav .nav-link.active,.layout-editor .navbar .navbar-collapse .navbar-nav.page-nav .nav-link:hover{
          background:${topnavActiveLinkBgColor};
        
        }`;
    }
    if (topnavActiveLinkTextColor !== undefined) {
      topnavActiveLinkStyling += `.layout-editor .navbar .navbar-nav.page-nav li a:not(.dropdown-item).active > span,
       .layout-editor .navbar .navbar-nav.page-nav li a:not(.dropdown-item).active > i,
       .layout-editor .navbar .navbar-nav.page-nav li a:not(.dropdown-item):focus > span,
       .layout-editor .navbar .navbar-nav.page-nav li a:not(.dropdown-item):focus > i
      .layout-editor .navbar .navbar-nav.page-nav li a:not(.dropdown-item):hover > span,
       .layout-editor .navbar .navbar-nav.page-nav li a:not(.dropdown-item):hover > i{
          color:${topnavActiveLinkTextColor};
        }
        `;
    }

    if (topnavActiveLinkIconColor !== undefined) {
      topnavActiveLinkStyling += `.layout-editor .navbar .navbar-nav.page-nav li a:not(.dropdown-item).active > i,
      .layout-editor .navbar .navbar-nav.page-nav li a:not(.dropdown-item):hover > i{
          color:${topnavActiveLinkIconColor};
        }
        `;
    } else if (topnavActiveLinkTextColor !== undefined) {
      topnavActiveLinkStyling += `.layout-editor .navbar .navbar-nav.page-nav li a:not(.dropdown-item).active > i,
      .layout-editor .navbar .navbar-nav.page-nav li a:not(.dropdown-item):hover > i{
          color:${topnavActiveLinkTextColor};
        }
        `;
    }
    if (sidenavLinkTextColor !== undefined) {
      sidenavLinkTextColorStyling += `.layout-editor .sidebar .nav li > a p,
  .layout-editor .sidebar .nav li > a i,
  .layout-editor .sidebar .nav li > a{
    color: ${sidenavLinkTextColor};
  }`;
    }
    if (sidenavActiveLinkBgColor !== undefined) {
      sidenavActiveLinkStyling += `.layout-editor .sidebar .nav li > a.active,.layout-editor .sidebar .nav li > a:hover{
          background:${sidenavActiveLinkBgColor};
        
        }`;
    }
    if (sidenavActiveLinkTextColor !== undefined) {
      sidenavActiveLinkStyling += `.layout-editor .sidebar .nav li > a.active p,.layout-editor .sidebar .nav li > a:hover p{
          color:${sidenavActiveLinkTextColor};
        }
        `;
    }

    if (sidenavActiveLinkIconColor !== undefined) {
      sidenavActiveLinkStyling += `.layout-editor .sidebar .nav li > a.active i,.layout-editor .sidebar .nav li > a:hover i{
          color:${sidenavActiveLinkIconColor};
        }`;
    } else if (sidenavActiveLinkTextColor !== undefined) {
      sidenavActiveLinkStyling += `.layout-editor .sidebar .nav li > a.active i,.layout-editor .sidebar .nav li > a:hover i{
          color:${sidenavActiveLinkTextColor};
        }`;
    }
    return (
      <Initializer>
        <AppContainer baseURL="/createproject" />

        <style
          dangerouslySetInnerHTML={{
            __html: `
         ${sidenavActiveLinkStyling}

         ${topnavActiveLinkStyling}
         ${topnavLinkColorStyling}
         ${sidenavLinkTextColorStyling}

          `,
            //sidehighlightBgColor
          }}
        />
      </Initializer>
    );
  }
}
export default connect()(TemplateView);
