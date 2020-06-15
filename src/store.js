import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./redux/reducers/";
import promiseMiddleware from "redux-promise-middleware";

const middleware = applyMiddleware(thunk, promiseMiddleware);
export default createStore(reducer, middleware);
