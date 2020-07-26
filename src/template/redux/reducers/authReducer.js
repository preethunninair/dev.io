export default function authReducer(
  state = { isAuthenticated: false, isFetching: false, errorMessage: "" },
  action
) {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "UN_AUTH":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
