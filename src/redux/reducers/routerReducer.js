export default function routerReducer(state = { subRoute: [] }, action) {
  switch (action.type) {
    case "SET_SUBROUTE":
      return {
        ...state,
        subRoute: action.payload,
      };
    default:
      return state;
  }
}
