import { jwtDecode } from "jwt-decode";
import { setError } from "./errorActions";
export const GET_SELECTED_ELEMENT = "GET_SELECTED_ELEMENT";
export const ADD_SELECTED_ELEMENT = "ADD_SELECTED_ELEMENT";
export const REMOVE_SINGLE_SELECTED_ELEMENT = "REMOVE_SINGLE_SELECTED_ELEMENT";
export const SET_PARTIAL_SELECTION = "SET_PARTIAL_SELECTION";
export const CLEAR_PENDING_PRESCRIPTIONS = "CLEAR_PENDING_PRESCRIPTIONS";
export const GET_SELECTED_PATIENT = "GET_SELECTED_PATIENT";
export const GET_PRESCRIPTIONS_LIST = "GET_PRESCRIPTIONS_LIST";
export const FILL_CART_PRESCRIPTION = "FILL_CART_PRESCRIPTIONS";
export const ADD_MEDICINE_TO_PRESCRIPTION = "ADD_MEDICINE_TO_PRESCRIPTION";
export const REMOVE_MEDICINE_FROM_PRESCRIPTION = "REMOVE_MEDICINE_FROM_PRESCRIPTION";
export const RESET_CART_PRESCRIPTION = "RESET_CART_PRESCRIPTION";
export const GET_PENDING_PRESCRIPTIONS = "GET_PENDING_PRESCRIPTIONS";
export const REMOVE_SELECTED_ELEMENT = "REMOVE_SELECTED_ELEMENT";

// ---------------------------------SELECT ELEMENT----------------------------------
export const selectElement = (data) => (dispatch) => dispatch({ type: GET_SELECTED_ELEMENT, payload: data });

// ---------------------------------DESELECT ELEMENT----------------------------------
export const deselectElement = () => (dispatch) => dispatch({ type: REMOVE_SELECTED_ELEMENT });

// ---------------------------------ADD SELECTED ELEMENT----------------------------------
export const addSelectedElement = (data) => (dispatch) => dispatch({ type: ADD_SELECTED_ELEMENT, payload: data });

// ---------------------------------REMOVE SINGLE SELECTED ELEMENT----------------------------------
export const removeSelectedElement = (data) => (dispatch) =>
  dispatch({ type: REMOVE_SINGLE_SELECTED_ELEMENT, payload: data });

// ---------------------------------SET SELECTED ELEMENT TO EMPTY ARRAY----------------------------------
export const setPartialSelection = () => (dispatch) => dispatch({ type: SET_PARTIAL_SELECTION });

// ---------------------------------SELECT PATIENT----------------------------------
export const selectPatient = (data) => (dispatch) => dispatch({ type: GET_SELECTED_PATIENT, payload: data });

// ---------------------------------FILL CART PRESCRIPTION----------------------------------
export const fillCartPrescription = (data) => (dispatch) => dispatch({ type: FILL_CART_PRESCRIPTION, payload: data });

// ---------------------------------ADD MEDICINE----------------------------------
export const addMedicine = (data) => (dispatch) => {
  dispatch({ type: ADD_MEDICINE_TO_PRESCRIPTION, payload: data });
};

// ---------------------------------REMOVE MEDICINE----------------------------------
export const removeMedcine = (data) => {
  return (dispatch) => {
    return dispatch({ type: REMOVE_MEDICINE_FROM_PRESCRIPTION, payload: data });
  };
};

//-----------------------------------------CLEAR CART--------------------------------------
export const clearCart = () => (dispatch) => dispatch({ type: RESET_CART_PRESCRIPTION, payload: [] });

// ---------------------------------GET PRESCRIPTIONS----------------------------------
export const fetchUserPrescription = (token) => {
  return async (dispatch) => {
    try {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      if (!decodedToken) {
        throw new Error("Decodifica del token fallita");
      }

      const resp = await fetch(`http://localhost:3001/${role === "DOCTOR" ? "doctors" : "patients"}/prescriptions`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: GET_PRESCRIPTIONS_LIST, payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// ---------------------------------------GET PENDING PRESCRPTIONS------------------------------------
export const fetchPendingPrescriotions = (token) => {
  return async (dispatch) => {
    try {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      if (!decodedToken) {
        throw new Error("Decodifica del token fallita");
      }
      const resp = await fetch(
        `http://localhost:3001/${role === "DOCTOR" ? "doctors" : "patients"}/prescriptionsToApp`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: GET_PENDING_PRESCRIPTIONS, payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// ---------------------------------CREATE PRESCRIPTION----------------------------------------
export const createPrescription = (
  token,
  patientId,
  diagnosticQuestion,
  priority,
  prescriptionTypology,
  cartPrescription
) => {
  return async (dispatch) => {
    try {
      if (cartPrescription.length <= 0) {
        throw new Error("Empty cart");
      }
      const prescription = cartPrescription.map((item) => ({
        medicine: { id: item.medicine.medicineId },
        quantity: item.quantity,
        note: "",
      }));

      // eslint-disable-next-line no-unused-vars
      const resp = await fetch("http://localhost:3001/doctors/createPrescription/" + patientId, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prescription: prescription,
          diagnosticQuestion: diagnosticQuestion,
          priority: priority,
          typeRecipe: prescriptionTypology,
        }),
      });
    } catch (error) {
      dispatch(setError(error.message));
      console.log(error.message);
    }
  };
};

// ---------------------------------SEND PRESCRIPTION REQUEST----------------------------------
export const sendPrescriptionRequest = (token, cartPrescription) => {
  return async (dispatch) => {
    try {
      if (cartPrescription.length <= 0) {
        throw new Error("Empty cart");
      }
      const prescription = cartPrescription.map((item) => ({
        medicine: { id: item.medicine.medicineId },
        quantity: item.quantity,
      }));

      // eslint-disable-next-line no-unused-vars
      const resp = await fetch("http://localhost:3001/patients/takePrescription", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prescription: prescription,
        }),
      });
    } catch (error) {
      dispatch(setError(error.message));
      console.log(error.message);
    }
  };
};

// ----------------------------------------APPROVE PRESCRIPTION-----------------------------------------
export const ApprovePrescription = (
  token,
  id,
  diagnosticQuestion,
  priority,
  prescriptionTypology,
  cartPrescription
) => {
  return async (dispatch) => {
    try {
      if (cartPrescription.length <= 0) {
        throw new Error("Empty cart");
      }
      const prescription = cartPrescription.map((item) => {
        return {
          medicine: { id: item.medicine.medicineId },
          quantity: item.quantity,
          note: "",
        };
      });

      // eslint-disable-next-line no-unused-vars
      const resp = await fetch("http://localhost:3001/doctors/prescriptions/" + id, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prescription: prescription,
          diagnosticQuestion: diagnosticQuestion,
          priority: priority,
          typeRecipe: prescriptionTypology,
        }),
      });
    } catch (error) {
      dispatch(setError(error.message));
      console.log(error.message);
    }
  };
}; // ----------------------------------------APPROVE MULTIPLE PRESCRIPTIONS-----------------------------------------
export const approveMultiplePrescriptions = (token, prescriptions) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3001/doctors/approveMultiplePrescriptions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prescriptions),
      });

      if (resp.ok) {
        dispatch({ type: CLEAR_PENDING_PRESCRIPTIONS, payload: prescriptions });
        dispatch({ type: REMOVE_SELECTED_ELEMENT });
      }
    } catch (error) {
      dispatch(setError(error.message));
      console.log(error.message);
    }
  };
};
