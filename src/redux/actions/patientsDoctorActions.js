import { jwtDecode } from "jwt-decode";

export const GET_PATIENT_LIST = "GET_PATIENT_LIST";
export const GET_SEARCH_PATIENT_RESULTS = "GET_SEARCH_RESULTS";

// --------------------------------FETCH PATIENT LIST--------------------------------------

export const fetchPatientList = (token) => {
  return async (dispatch) => {
    try {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      if (!decodedToken) {
        throw new Error("Decodifica del token fallita");
      }

      if (role === "DOCTOR") {
        const resp = await fetch("http://localhost:3001/doctors/patients", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (resp.ok) {
          const data = await resp.json();
          dispatch({ type: GET_PATIENT_LIST, payload: data });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// ---------------------------------------SEARCH PATIENTS------------------------------------
export const fetchSearchPatient = (token, query, searchType) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3001/patients/search" + "?q=" + query + "&by=" + searchType, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: GET_SEARCH_PATIENT_RESULTS, payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
