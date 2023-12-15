import { SAVED_TOKEN } from "./authenticationActions";
import { GET_CURRENT_USER, GET_SELECTED_ELEMENT, LOGOUT } from "./mainActions";

const mainState = {
  searchResults: [],
  selectedElement: null,
  savedToken: null,
  currentUser: null,
};

const mainReducer = (state = mainState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case GET_SELECTED_ELEMENT:
      return {
        ...state,
        selectedElement: action.payload,
      };
    case SAVED_TOKEN:
      return {
        ...state,
        savedToken: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
export default mainReducer;
