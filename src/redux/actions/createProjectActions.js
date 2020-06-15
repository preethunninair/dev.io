export function updateSelectedTemplate(template) {
  return function (dispatch) {
    dispatch({ type: "UPDATE_SELECTEDTEMPLATE_CONFIG", payload: template });
  };
}
