const { default: reducers } = require(".");

export default function templateConfigReducer(
  state = {
    config: {
      templateName: "Sidenav Standard",

      logoTheme: "dark",
      layout: "SIDE_NAVIGATION",
      submenuConfig: "TNS",

      gridConfig: "S0",
      rounded: "FALSE",
      boxed: "FALSE",
      padded: "FALSE",
      template: "S0",
      floatingMenu: "FALSE",
      logoBgColor: "#171725",
      topnavBgColor: "white",
      sidenavBgColor: "#1e1e2f",
      sidenavlinktemplate: "SLT2",
      topnavlinktemplate: "LT1_NOICON",
      topnavsize: "M",
      sidenavsize: "S",
      appBgColor: "#f2f2f2",
      topnavSecondaryBgColor: "NA",
      sidenavMenuAlignCenter: "FALSE",
      containerBgColor: null,
      contained: "FALSE",
      tnshadow: "FALSE",
      snshadow: "FALSE",
      logoOnNav: "FALSE",
      sidenavOnly: "FALSE",
    },
  },
  action
) {
  switch (action.type) {
    case "SET_TEMPLATECONFIG":
      return {
        ...state,
        config: action.payload,
      };

    default:
      return state;
  }
}