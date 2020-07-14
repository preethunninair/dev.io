export function setSubRoute(subRoute) {
  return function (dispatch) {
    dispatch({ type: "SET_SUBROUTE", payload: subRoute });
  };
}
