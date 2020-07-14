export default function routerReducer(
  state = { routes: [], subRoute: [] },
  action
) {
  switch (action.type) {
    case "SET_ROUTE":
      return {
        ...state,
        routes: action.payload,
      };
    case "SET_SUBROUTE":
      return {
        ...state,
        subRoute: action.payload,
      };
    default:
      return state;
  }
}
