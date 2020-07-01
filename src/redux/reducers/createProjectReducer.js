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
      navbarBgColor: "white",
      sidebarBgColor: "#1e1e2f",
      sidebarlinktemplate: "SLT1",
      navbarlinktemplate: "LT0_NOICON",
      navbarsize: "M",
      sidebarsize: "S",
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
