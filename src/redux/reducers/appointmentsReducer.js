import { GET_APPOINTMENTS_LIST } from "../actions/appointmentActions";

const prescriptionState = {
  appointmentsList: [],
};
const appointmentsReducer = (state = prescriptionState, action) => {
  switch (action.type) {
    case GET_APPOINTMENTS_LIST:
      return {
        ...state,
        appointmentsList: action.payload,
      };
    default:
      return state;
  }
};

export default appointmentsReducer;
