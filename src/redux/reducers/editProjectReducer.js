const { default: reducers } = require(".");

export default function templateConfig(
  state = {
    route: [],
    templateConfig: {
      templateName: "Sidenav Reduced",
      templateID: "S1",
      selectedPage: "/createproject/admin",

      logoTheme: "dark",
      layout: "SIDE_NAVIGATION",
      submenuConfig: "SNS",
      searchbarConfig: {
        placement: "RIGHT",
        width: "15vw",
        floating: true,
      },
      gridConfig: "S1",
      rounded: "FALSE",
      boxed: "FALSE",
      padded: "FALSE",
      template: "S1",

      logoBgColor: "#1e1e2f",
      topnavBgColor: "white",
      sidenavBgColor: "#1e1e2f",
      sidenavlinktemplate: "SLT1",
      topnavlinktemplate: "LT1_NOICON",
      topnavsize: "M",
      sidenavsize: "S",
    },
  },
  action
) {
  switch (action.type) {
    case "UPDATE_SELECTEDTEMPLATE_CONFIG":
      return {
        ...state,
        templateConfig: action.payload,
      };
    case "CREATE_ROUTE_CONFIG":
      return {
        ...state,
        route: action.payload,
      };
    default:
      return state;
  }
}
