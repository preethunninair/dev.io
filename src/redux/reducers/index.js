import { combineReducers } from "redux";
import templateConfig from "./createProjectReducer";
import routerReducer from "./routerReducer";
export default combineReducers({
  templateConfig,
  routerReducer,
});
