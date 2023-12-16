export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const GET_SELECTED_ELEMENT = "GET_SELECTED_ELEMENT";
export const GET_PRESCRIPTIONS_LIST = "GET_PRESCRIPTIONS_LIST";

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
