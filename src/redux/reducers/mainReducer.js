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

    default:
      return state;
  }
};
export default mainReducer;
