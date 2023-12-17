import { GET_PRESCRIPTIONS_LIST } from "../actions/mainActions";
import { ADD_MEDICINE_TO_PRESCRIPTION, REMOVE_MEDICINE_TO_PRESCRIPTION } from "../actions/patientActions";

const patientState = {
  prescriptionList: [],
  cartPrescription: [],
};

const patientReducer = (state = patientState, action) => {
  switch (action.type) {
    case GET_PRESCRIPTIONS_LIST:
      return {
        ...state,
        prescriptionList: action.payload,
      };
    case ADD_MEDICINE_TO_PRESCRIPTION:
      return {
        ...state,
        cartPrescription: [...state.cartPrescription, action.payload],
      };
    case REMOVE_MEDICINE_TO_PRESCRIPTION:
      return {
        ...state,
        cartPrescription: state.cartPrescription.filter((medicine) => medicine.id != action.payload),
      };
    default:
      return state;
  }
};
export default patientReducer;
