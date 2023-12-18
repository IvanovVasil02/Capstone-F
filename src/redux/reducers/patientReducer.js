import {
  ADD_MEDICINE_TO_PRESCRIPTION,
  GET_PRESCRIPTIONS_LIST,
  REMOVE_MEDICINE_FROM_PRESCRIPTION,
} from "../actions/patientActions";

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

    case ADD_MEDICINE_TO_PRESCRIPTION: {
      const existingMedicineIndex = state.cartPrescription.findIndex(
        (item) => item.medicine.medicineId === action.payload.medicine.medicineId
      );
      if (existingMedicineIndex !== -1) {
        return {
          ...state,
          cartPrescription: state.cartPrescription.map((item, index) =>
            index === existingMedicineIndex ? { ...item, quantity: item.quantity + action.payload.quantity } : item
          ),
        };
      } else {
        return {
          ...state,
          cartPrescription: [...state.cartPrescription, action.payload],
        };
      }
    }

    case REMOVE_MEDICINE_FROM_PRESCRIPTION:
      return {
        ...state,
        cartPrescription: state.cartPrescription.filter((medicine) => medicine.id != action.payload),
      };
    default:
      return state;
  }
};
export default patientReducer;
