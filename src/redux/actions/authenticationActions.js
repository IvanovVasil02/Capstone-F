import { getUserProfile } from "./mainActions";

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
