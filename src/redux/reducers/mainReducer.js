import { SAVED_TOKEN } from "../actions/authenticationActions";
import { GET_CURRENT_USER, GET_PRESCRIPTIONS_LIST, GET_SELECTED_ELEMENT } from "../actions/mainActions";

const mainState = {
  searchResults: [],
  selectedElement: null,
  isAuthenticated: false,
  savedToken: null,
  currentUser: null,
  prescriptionList: [],
};

const mainReducer = (state = mainState, action) => {
  switch (action.type) {
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
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case GET_PRESCRIPTIONS_LIST:
      return {
        ...state,
        prescriptionList: action.payload,
      };

    case "LOGOUT":
      return {
        ...mainState,
      };
    default:
      return state;
  }
};
export default mainReducer;
