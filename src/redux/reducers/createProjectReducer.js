const { default: reducers } = require(".");

export default function createProjectReducer(
  state = {
    templateConfig: {},
    route: [],
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
