import template from "../../codespace_config/config.json";
const { default: reducers } = require(".");

export default function templateConfigReducer(
  state = {
    config: template,
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
