import { jwtDecode } from "jwt-decode";
export const GET_PRESCRIPTIONS_LIST = "GET_PRESCRIPTIONS_LIST";
export const ADD_MEDICINE_TO_PRESCRIPTION = "ADD_MEDICINE_TO_PRESCRIPTION";
export const REMOVE_MEDICINE_FROM_PRESCRIPTION = "REMOVE_MEDICINE_FROM_PRESCRIPTION";
export const RESET_CART_PRESCRIPTION = "RESET_CART_PRESCRIPTION";

// ---------------------------------PRESCRIPTIONS----------------------------------

export const fetchUserPrescription = (token) => {
  return async (dispatch) => {
    try {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      if (!decodedToken) {
        throw new Error("Decodifica del token fallita");
      }

      if (role === "DOCTOR") {
        const resp = await fetch("http://localhost:3001/doctors/prescriptions", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (resp.ok) {
          const data = await resp.json();
          dispatch({ type: GET_PRESCRIPTIONS_LIST, payload: data });
        }
      } else {
        const resp = await fetch("http://localhost:3001/patients/prescriptions", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (resp.ok) {
          const data = await resp.json();
          dispatch({ type: GET_PRESCRIPTIONS_LIST, payload: data });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

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

export const clearCart = () => (dispatch) => dispatch({ type: RESET_CART_PRESCRIPTION, payload: [] });
