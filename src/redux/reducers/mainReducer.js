import { GET_CURRENT_USER, GET_SELECTED_ELEMENT } from "../actions/mainActions";

const mainState = {
  searchResults: [],
  selectedElement: null,
  currentUser: {},
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
    default:
      return state;
  }
};
export default mainReducer;
