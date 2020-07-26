export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: "UN_AUTH" });
  };
}

export function loginUser(credentials) {
  return function (dispatch) {
    dispatch({ type: "AUTH_SUCCESS" });
  };
}
