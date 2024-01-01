import { GET_APPOINTMENTS_LIST, GET_PENDING_APPOINTMENTS_LIST } from "../actions/appointmentActions";

const appointmentsState = {
  appointmentsList: [],
  pendingAppointmentsList: [],
};
const appointmentsReducer = (state = appointmentsState, action) => {
  switch (action.type) {
    case GET_APPOINTMENTS_LIST:
      return {
        ...state,
        appointmentsList: action.payload,
      };
    case GET_PENDING_APPOINTMENTS_LIST:
      return {
        ...state,
        pendingAppointmentsList: action.payload,
      };
    default:
      return state;
  }
};

export default appointmentsReducer;
