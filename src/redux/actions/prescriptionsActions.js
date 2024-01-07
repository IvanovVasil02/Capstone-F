import { jwtDecode } from "jwt-decode";
export const GET_SELECTED_ELEMENT = "GET_SELECTED_ELEMENT";
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
    console.log("ciao");
    try {
      const prescription = cartPrescription.map((item) => ({
        medicine: { id: item.medicine.medicineId },
        quantity: item.quantity,
        note: "",
      }));

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

      if (resp.ok) {
        dispatch({ type: RESET_CART_PRESCRIPTION, payload: [] });
      } else if (!resp.ok) {
        console.log(resp.json());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// ---------------------------------SEND PRESCRIPTION REQUEST----------------------------------
export const sendPrescriptionRequest = (token, cartPrescription) => {
  return async (dispatch) => {
    console.log("ciao");
    try {
      const prescription = cartPrescription.map((item) => ({
        medicine: { id: item.medicine.medicineId },
        quantity: item.quantity,
      }));

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

      if (resp.ok) {
        dispatch({ type: RESET_CART_PRESCRIPTION, payload: [] });
      }
    } catch (err) {
      console.log(err);
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
  return async () => {
    try {
      const prescription = cartPrescription.map((item) => {
        console.log("Prescription item:", item);
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
    } catch (err) {
      console.log(err);
    }
  };
};
