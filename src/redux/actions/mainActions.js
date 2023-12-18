export const GET_CURRENT_USER = "GET_CURRENT_USER";
export const GET_SELECTED_ELEMENT = "GET_SELECTED_ELEMENT";
export const GET_APPOINTMENTS_LIST = "GET_APPOINTMENTS_LIST";
export const GET_SEARCH_RESULTS = "GET_SEARCH_RESULTS";
import { jwtDecode } from "jwt-decode";

// ---------------------------------GET USER----------------------------------

export const getUserProfile = (token) => {
  return async (dispatch) => {
    try {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      if (!decodedToken) {
        throw new Error("Decodifica del token fallita");
      }

      if (role === "DOCTOR") {
        const resp = await fetch("http://localhost:3001/doctors/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (resp.ok) {
          const data = await resp.json();
          dispatch({ type: GET_CURRENT_USER, payload: data });
        }
      } else if (role === "PATIENT") {
        const resp = await fetch("http://localhost:3001/patients/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (resp.ok) {
          const data = await resp.json();
          dispatch({ type: GET_CURRENT_USER, payload: data });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// ---------------------------------APPOINTMENTS----------------------------------

export const fetchUserAppointments = (token) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3001/patients/me/appointments", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: GET_APPOINTMENTS_LIST, payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// ---------------------------------SEARCH----------------------------------

export const fetchSearch = (token, query, searchType) => {
  return async (dispatch) => {
    try {
      const resp = await fetch("http://localhost:3001/medicines/search/" + searchType + "?q=" + query, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: GET_SEARCH_RESULTS, payload: data });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
