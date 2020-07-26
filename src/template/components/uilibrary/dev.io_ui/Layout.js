import React from "react";
import { useSelector } from "react-redux";
import tinycolor from "tinycolor2";

function Layout(props) {
  const templateConfig = useSelector((state) => state.templateConfig.config);
  return (
    <div
      className={`wrapper ${
        props.wrapperClass != undefined && props.wrapperClass != null
          ? props.wrapperClass
          : ""
      }`}
      style={{ background: templateConfig.appBgColor }}
      data-contained={templateConfig.contained}
      data-codespace="TRUE"
      data-appmode={
        tinycolor(
          templateConfig.contained === "TRUE"
            ? templateConfig.containerBgColor
            : templateConfig.appBgColor
        ).isDark()
          ? "dark"
          : "light"
      }
    >
      <div
        className={`app-container ${
          props.containerClass != undefined && props.containerClass != null
            ? props.containerClass
            : ""
        }`}
        style={
          templateConfig.contained === "TRUE"
            ? { background: templateConfig.containerBgColor }
            : {}
        }
        data-topnavsize={templateConfig.topnavsize}
        data-floatingmenu={templateConfig.floatingMenu}
        data-sidenavsize={templateConfig.sidenavsize}
        data-logoheightsize={templateConfig.logoheightsize}
        data-logowidthsize={templateConfig.logowidthsize}
        data-padded={templateConfig.padded}
        data-logoonnav={templateConfig.logoOnNav}
        data-boxed={templateConfig.boxed}
        data-layout={templateConfig.layout}
        data-rounded={templateConfig.rounded}
        data-grid={templateConfig.gridConfig}
        data-snshadow={templateConfig.snshadow}
        data-tnshadow={templateConfig.tnshadow}
        data-sidenavonly={templateConfig.sidenavOnly}
      >
        {props.children}
      </div>
    </div>
  );
}
export default Layout;
