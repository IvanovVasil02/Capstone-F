export const GET_APPOINTMENTS_LIST = "GET_APPOINTMENTS_LIST";
export const GET_PENDING_APPOINTMENTS_LIST = "GET_PENDING_APPOINTMENTS_LIST";
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
      // const resp = await fetch("http://localhost:3001/doctors/appointments", {
      const resp = await fetch(`http://localhost:3001/${role === "DOCTOR" ? "doctors" : "patients"}/appointments`, {
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

// ---------------------------------PENDING APPOINTMENTS----------------------------------

export const fetchUserPendingAppointments = (token) => {
  return async (dispatch) => {
    try {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      if (!decodedToken) {
        throw new Error("Decodifica del token fallita");
      }

      // const resp = await fetch("http://localhost:3001/doctors/pendingAppointments", {
      const resp = await fetch(
        `http://localhost:3001/${role === "DOCTOR" ? "doctors" : "patients"}/pendingAppointments`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: GET_PENDING_APPOINTMENTS_LIST, payload: data });
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
      // eslint-disable-next-line no-unused-vars
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
      // const resp = await fetch("http://localhost:3001/doctors/fixAppointment", {
      // eslint-disable-next-line no-unused-vars
      const resp = await fetch("http://localhost:3001/doctors/fixAppointment", {
        method: "PUT",
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
