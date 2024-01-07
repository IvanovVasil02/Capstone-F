import { GET_CURRENT_USER, LOGOUT, SAVED_TOKEN } from "../actions/authenticationActions";

const authenticationState = {
  savedToken: null,
  currentUser: null,
};

const authenticationReducer = (state = authenticationState, action) => {
  switch (action.type) {
    case SAVED_TOKEN:
      return {
        ...state,
        savedToken: action.payload,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case LOGOUT:
      return authenticationState;

    default:
      return state;
  }
};
export default authenticationReducer;
