import React from "react";
import { useSelector } from "react-redux";

function Themer(props) {
  const themeObj = useSelector((state) => state.templateConfig.config);

  const {
    sidenavActiveLinkBgColor,
    sidenavLinkTextColor,
    sidenavActiveLinkTextColor,
    sidenavActiveLinkIconColor,

    topnavActiveLinkBgColor,
    topnavLinkTextColor,
    topnavActiveLinkTextColor,
    topnavActiveLinkIconColor,
  } = themeObj;

  let sidenavActiveLinkStyling = "";
  let topnavActiveLinkStyling = "";
  let topnavLinkColorStyling = "";
  let sidenavLinkTextColorStyling = "";
  if (topnavLinkTextColor !== undefined) {
    topnavLinkColorStyling += `.wrapper[data-codespace="TRUE"] .navbar .navbar-nav.page-nav li a:not(.dropdown-item) > span,
 .wrapper[data-codespace="TRUE"] .navbar .navbar-nav.page-nav li a:not(.dropdown-item) > i {
   color: ${topnavLinkTextColor} !important;
 }`;
  }

  if (topnavActiveLinkBgColor !== undefined) {
    topnavActiveLinkStyling += `
      .wrapper[data-codespace="TRUE"] .navbar .navbar-collapse .navbar-nav.page-nav .nav-link.active,
      .wrapper[data-codespace="TRUE"] .navbar .navbar-collapse .navbar-nav.page-nav .nav-link:hover{
        background:${topnavActiveLinkBgColor} !important;
      
      }`;
  }
  if (topnavActiveLinkTextColor !== undefined) {
    topnavActiveLinkStyling += `
     
    .wrapper[data-codespace="TRUE"] .navbar .navbar-nav.page-nav li a:not(.dropdown-item):hover > span,
     .wrapper[data-codespace="TRUE"] .navbar .navbar-nav.page-nav li a:not(.dropdown-item):hover > i,
     .wrapper[data-codespace="TRUE"] .navbar .navbar-nav.page-nav li a:not(.dropdown-item):focus > span,
     .wrapper[data-codespace="TRUE"] .navbar .navbar-nav.page-nav li a:not(.dropdown-item):focus > i,
     .wrapper[data-codespace="TRUE"] .navbar .navbar-nav.page-nav li a:not(.dropdown-item).active > span,
     .wrapper[data-codespace="TRUE"] .navbar .navbar-nav.page-nav li a:not(.dropdown-item).active > i{
        color:${topnavActiveLinkTextColor} !important;
      }
      `;
  }

  if (topnavActiveLinkIconColor !== undefined) {
    topnavActiveLinkStyling += `
    .wrapper[data-codespace="TRUE"] .navbar .navbar-nav.page-nav li a:not(.dropdown-item):hover > i,
    .wrapper[data-codespace="TRUE"] .navbar .navbar-nav.page-nav li a:not(.dropdown-item).active > i{
        color:${topnavActiveLinkIconColor} !important;
      }
      `;
  } else if (topnavActiveLinkTextColor !== undefined) {
    topnavActiveLinkStyling += `
    .wrapper[data-codespace="TRUE"] .navbar .navbar-nav.page-nav li a:not(.dropdown-item):hover > i,
    .wrapper[data-codespace="TRUE"] .navbar .navbar-nav.page-nav li a:not(.dropdown-item).active > i{
        color:${topnavActiveLinkTextColor} !important;
      }
      `;
  }
  if (sidenavLinkTextColor !== undefined) {
    sidenavLinkTextColorStyling += `.wrapper[data-codespace="TRUE"] .sidebar .nav li > a span,
    .wrapper[data-codespace="TRUE"] .sidebar .nav li > a i,
    .wrapper[data-codespace="TRUE"] .sidebar .nav li > a{
  color: ${sidenavLinkTextColor} !important;
}`;
  }
  if (sidenavActiveLinkBgColor !== undefined) {
    sidenavActiveLinkStyling += `
    .wrapper[data-codespace="TRUE"] .sidebar .nav li > a:hover,
    .wrapper[data-codespace="TRUE"] .sidebar .nav li > a.active{
        background:${sidenavActiveLinkBgColor} !important;
      
      }`;
  }
  if (sidenavActiveLinkTextColor !== undefined) {
    sidenavActiveLinkStyling += `
    .wrapper[data-codespace="TRUE"] .sidebar .nav li > a:hover span,
    .wrapper[data-codespace="TRUE"] .sidebar .nav li > a.active span{
        color:${sidenavActiveLinkTextColor} !important;
      }
      `;
  }

  if (sidenavActiveLinkIconColor !== undefined) {
    sidenavActiveLinkStyling += `
    .wrapper[data-codespace="TRUE"] .sidebar .nav li > a:hover i,
    .wrapper[data-codespace="TRUE"] .sidebar .nav li > a.active i{
        color:${sidenavActiveLinkIconColor} !important;
      }`;
  } else if (sidenavActiveLinkTextColor !== undefined) {
    sidenavActiveLinkStyling += `
    .wrapper[data-codespace="TRUE"] .sidebar .nav li > a:hover i,
    .wrapper[data-codespace="TRUE"] .sidebar .nav li > a.active i{
        color:${sidenavActiveLinkTextColor} !important;
      }`;
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        ${sidenavActiveLinkStyling}
        ${topnavActiveLinkStyling}
        ${topnavLinkColorStyling}
        ${sidenavLinkTextColorStyling}`,
          //sidehighlightBgColor
        }}
      />
      {props.children}
    </>
  );
}

export default Themer;
