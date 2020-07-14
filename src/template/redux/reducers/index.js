import { combineReducers } from "redux";
import templateConfig from "./templateConfigReducer";
import routerReducer from "./routerReducer";
export default combineReducers({
  templateConfig,
  routerReducer,
});
