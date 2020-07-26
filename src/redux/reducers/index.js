import { combineReducers } from "redux";
import templateConfig from "../../template/redux/reducers/templateConfigReducer";
import routerReducer from "../../template/redux/reducers/routerReducer";
import createProjectReducer from "./createProjectReducer";
export default combineReducers({
  templateConfig,
  routerReducer,
  createProjectReducer,
});
