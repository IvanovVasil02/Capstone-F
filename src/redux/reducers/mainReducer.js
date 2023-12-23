import { GET_SEARCH_MEDICINE_RESULTS, GET_SEARCH_PATIENT_RESULTS, GET_SELECTED_ELEMENT } from "../actions/mainActions";
const mainState = {
  searchMedicineResults: [],
  searchPatientResults: [],
  selectedElement: null,
};

const mainReducer = (state = mainState, action) => {
  switch (action.type) {
    case GET_SELECTED_ELEMENT:
      return {
        ...state,
        selectedElement: action.payload,
      };
    case GET_SEARCH_MEDICINE_RESULTS:
      return {
        ...state,
        searchMedicineResults: action.payload,
      };
    case GET_SEARCH_PATIENT_RESULTS:
      return {
        ...state,
        searchPatientResults: action.payload,
      };

    default:
      return state;
  }
};
export default mainReducer;
