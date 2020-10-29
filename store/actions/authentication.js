export const AUTHENTICATE_USER = "authenticate_user";
export const SIGN_USER_OUT = "sign_user_out";

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
