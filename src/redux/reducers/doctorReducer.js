import { GET_PATIENT_LIST } from "../actions/patientsDoctorActions";

const doctorState = {
  patientList: [],
};

const doctorReducer = (state = doctorState, action) => {
  switch (action.type) {
    case GET_PATIENT_LIST:
      return {
        ...state,
        patientList: action.payload,
      };

    default:
      return state;
  }
};

export default doctorReducer;
