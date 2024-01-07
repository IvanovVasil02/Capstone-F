import { LOGOUT } from "../actions/authenticationActions";
import { GET_SEARCH_MEDICINE_RESULTS } from "../actions/mainActions";
const mainState = {
  searchMedicineResults: [],
};

const mainReducer = (state = mainState, action) => {
  switch (action.type) {
    case GET_SEARCH_MEDICINE_RESULTS:
      return {
        ...state,
        searchMedicineResults: action.payload,
      };

    case LOGOUT:
      return mainState;

    default:
      return state;
  }
};
export default mainReducer;
