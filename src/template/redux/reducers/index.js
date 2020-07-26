import { combineReducers } from "redux";
import templateConfig from "./templateConfigReducer";
import authState from "./authReducer";
import routerReducer from "./routerReducer";
export default combineReducers({
  templateConfig,
  authState,
  routerReducer,
});
