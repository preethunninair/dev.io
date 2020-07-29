import React from "react";
import { useSelector } from "react-redux";
import tinycolor from "tinycolor2";

function BrandLogo(props) {
  const templateConfig = useSelector((state) => state.templateConfig.config);

  return (
    <div
      className="app-brand d-none d-md-block"
      data-grid={templateConfig.gridConfig}
    >
      <div
        className="brand-img h-100"
        style={{ background: templateConfig.logoBgColor }}
        data-theme={
          tinycolor(templateConfig.logoBgColor).isDark() ? "dark" : "light"
        }
      >
        {props.brandContent}
      </div>
    </div>
  );
}
export default BrandLogo;
