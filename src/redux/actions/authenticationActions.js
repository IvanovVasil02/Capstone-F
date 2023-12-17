import { jwtDecode } from "jwt-decode";
import { GET_CURRENT_USER } from "./mainActions";

export const SAVED_TOKEN = "SAVED_TOKEN";

export const fetchLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/authentication/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const resp = await response.json();
        await dispatch({ type: SAVED_TOKEN, payload: resp.token });
        dispatch(getUserProfile(resp.token));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const registerUser = (
  name,
  surname,
  birthDate,
  address,
  sex,
  postalCode,
  email,
  password,
  phoneNumber,
  doctorId
) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/authentication/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          surname,
          birthDate,
          address,
          sex,
          postalCode,
          email,
          password,
          phoneNumber,
          doctorId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const resp = await response.json();
        await dispatch({ type: SAVED_TOKEN, payload: resp.token });
        dispatch(getUserProfile(resp.token));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

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
