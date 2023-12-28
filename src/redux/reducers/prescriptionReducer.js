import {
  ADD_MEDICINE_TO_PRESCRIPTION,
  GET_PENDING_PRESCRIPTIONS,
  GET_PRESCRIPTIONS_LIST,
  REMOVE_MEDICINE_FROM_PRESCRIPTION,
  RESET_CART_PRESCRIPTION,
} from "../actions/prescriptionsActions";

const prescriptionState = {
  prescriptionList: [],
  pendingPrescriptions: [],
  cartPrescription: [],
};
const prescriptionReducer = (state = prescriptionState, action) => {
  switch (action.type) {
    case GET_PRESCRIPTIONS_LIST:
      return {
        ...state,
        prescriptionList: action.payload,
      };
    case RESET_CART_PRESCRIPTION:
      return {
        ...state,
        cartPrescription: action.payload,
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

    case REMOVE_MEDICINE_FROM_PRESCRIPTION: {
      const existingMedicineIndex = state.cartPrescription.findIndex(
        (item) => item.medicine.medicineId === action.payload
      );

      if (existingMedicineIndex !== -1) {
        const existingMedicine = state.cartPrescription[existingMedicineIndex];

        if (existingMedicine.quantity > 1) {
          return {
            ...state,
            cartPrescription: state.cartPrescription.map((item, index) =>
              index === existingMedicineIndex ? { ...item, quantity: item.quantity - 1 } : item
            ),
          };
        } else {
          return {
            ...state,
            cartPrescription: state.cartPrescription.filter(
              (medicine) => medicine.medicine.medicineId !== action.payload
            ),
          };
        }
      } else {
        return state;
      }
    }

    case GET_PENDING_PRESCRIPTIONS:
      return {
        ...state,
        pendingPrescriptions: action.payload,
      };
    default:
      return state;
  }
};

export default prescriptionReducer;
