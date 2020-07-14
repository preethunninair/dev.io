import { combineReducers } from "redux";
import devioTemplateConfig from "./createProjectReducer";
import templateConfig from "../../template/redux/reducers/templateConfigReducer";
import routerReducer from "../../template/redux/reducers/routerReducer";
export default combineReducers({
  templateConfig,
  devioTemplateConfig,
  routerReducer,
});
