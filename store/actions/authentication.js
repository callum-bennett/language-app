import { AUTHENTICATE_USER, SIGN_USER_OUT } from "./types";

export const setAuthenticated = (token) => {
  return {
    type: AUTHENTICATE_USER,
    payload: {
      token,
    },
  };
};

export const signUserOut = () => {
  return {
    type: SIGN_USER_OUT,
  };
};
