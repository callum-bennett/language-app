import { AUTHENTICATE_USER, SIGN_USER_OUT } from "./types";

export const setAuthenticated = (token) => ({
  type: AUTHENTICATE_USER,
  payload: {
    token,
  },
});

export const signUserOut = () => ({
  type: SIGN_USER_OUT,
});
