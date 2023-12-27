import { GET_PATIENT_LIST, GET_SEARCH_PATIENT_RESULTS } from "../actions/patientsDoctorActions";

const doctorState = {
  patientList: [],
  searchPatientResults: [],
};

const doctorReducer = (state = doctorState, action) => {
  switch (action.type) {
    case GET_PATIENT_LIST:
      return {
        ...state,
        patientList: action.payload,
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

export default doctorReducer;
