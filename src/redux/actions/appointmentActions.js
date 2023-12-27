export const GET_APPOINTMENTS_LIST = "GET_APPOINTMENTS_LIST";
import { jwtDecode } from "jwt-decode";

// ---------------------------------APPOINTMENTS----------------------------------

export const fetchUserAppointments = (token) => {
  return async (dispatch) => {
    try {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      if (!decodedToken) {
        throw new Error("Decodifica del token fallita");
      }

      if (role === "DOCTOR") {
        const resp = await fetch("http://localhost:3001/doctors/appointments", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (resp.ok) {
          const data = await resp.json();
          dispatch({ type: GET_APPOINTMENTS_LIST, payload: data });
        }
      } else if (role === "PATIENT") {
        const resp = await fetch("http://localhost:3001/patients/appointments", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (resp.ok) {
          const data = await resp.json();
          dispatch({ type: GET_APPOINTMENTS_LIST, payload: data });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// ---------------------------------ASK APPOINTMENT----------------------------------

export const askAppointment = (token) => {
  return async () => {
    try {
      const resp = await fetch("http://localhost:3001/patients/askAppointment", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// ---------------------------------FIX APPOINTMENT----------------------------------
export const fixApppointment = (token, id, date, time) => {
  return async () => {
    try {
      const resp = await fetch("http://localhost:3001/patients/fixAppointment", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          date,
          time,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
};
