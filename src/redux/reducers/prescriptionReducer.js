import { LOGOUT } from "../actions/authenticationActions";
import {
  ADD_MEDICINE_TO_PRESCRIPTION,
  ADD_SELECTED_ELEMENT,
  CLEAR_PENDING_PRESCRIPTIONS,
  FILL_CART_PRESCRIPTION,
  GET_PENDING_PRESCRIPTIONS,
  GET_PRESCRIPTIONS_LIST,
  GET_SELECTED_ELEMENT,
  GET_SELECTED_PATIENT,
  REMOVE_MEDICINE_FROM_PRESCRIPTION,
  REMOVE_SELECTED_ELEMENT,
  REMOVE_SINGLE_SELECTED_ELEMENT,
  RESET_CART_PRESCRIPTION,
  SET_PARTIAL_SELECTION,
} from "../actions/prescriptionsActions";

const prescriptionState = {
  selectedElement: null,
  selectedPatient: null,
  prescriptionList: [],
  pendingPrescriptions: [],
  cartPrescription: [],
};
const prescriptionReducer = (state = prescriptionState, action) => {
  switch (action.type) {
    case GET_SELECTED_ELEMENT:
      return {
        ...state,
        selectedElement: action.payload,
      };
    case REMOVE_SELECTED_ELEMENT:
      return {
        ...state,
        selectedElement: null,
      };
    case ADD_SELECTED_ELEMENT:
      return {
        ...state,
        selectedElement: [...state.selectedElement, action.payload],
      };
    case REMOVE_SINGLE_SELECTED_ELEMENT:
      return {
        ...state,
        selectedElement:
          state.selectedElement && Array.isArray(state.selectedElement)
            ? state.selectedElement.filter((prescriptionId) => prescriptionId !== action.payload)
            : null,
      };
    case SET_PARTIAL_SELECTION:
      return {
        ...state,
        selectedElement: [],
      };

    case CLEAR_PENDING_PRESCRIPTIONS:
      return {
        ...state,
        pendingPrescriptions: state.pendingPrescriptions.filter((prescription) => {
          const prescriptionId = prescription?.prescriptionID;
          return prescriptionId ? !action.payload.includes(prescriptionId) : true;
        }),
      };

    case GET_SELECTED_PATIENT:
      return {
        ...state,
        selectedPatient: action.payload,
      };
    case GET_PRESCRIPTIONS_LIST:
      return {
        ...state,
        prescriptionList: action.payload,
      };
    case FILL_CART_PRESCRIPTION:
      return {
        ...state,
        cartPrescription: action.payload,
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

    case LOGOUT:
      return prescriptionState;

    default:
      return state;
  }
};

export default prescriptionReducer;
