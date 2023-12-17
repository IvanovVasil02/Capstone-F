export const GET_PRESCRIPTIONS_LIST = "GET_PRESCRIPTIONS_LIST";
export const ADD_MEDICINE_TO_PRESCRIPTION = "GET_CART_PRESCRIPTION";
export const REMOVE_MEDICINE_TO_PRESCRIPTION = "GET_CART_PRESCRIPTION";

// ---------------------------------ADD MEDICINE----------------------------------

export const addMedicine = (data) => {
  (dispatch) => dispatch({ type: ADD_MEDICINE_TO_PRESCRIPTION, payload: data });
};

// ---------------------------------REMOVE MEDICINE----------------------------------

export const removeMedcine = (data) => {
  (dispatch) => dispatch({ type: REMOVE_MEDICINE_TO_PRESCRIPTION, payload: data });
};

// ---------------------------------PRESCRIPTIONS----------------------------------

export const fetchUserPrescription = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3001/patients/me/prescriptions", {
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
