export function updateSelectedTemplate(template) {
  return function (dispatch) {
    dispatch({ type: "UPDATE_SELECTEDTEMPLATE_CONFIG", payload: template });
  };
}
export function createRoute(route) {
  return function (dispatch) {
    dispatch({ type: "CREATE_ROUTE_CONFIG", payload: route });
  };
}
