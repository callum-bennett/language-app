import { AUTHENTICATE_USER, SIGN_USER_OUT } from "../actions/authentication";

const initialState = {
  authenticated: false,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      const { token } = action.payload;
      console.log("");
      return {
        authenticated: true,
        token,
      };
      break;

    case SIGN_USER_OUT:
      return {
        authenticated: false,
        token: null,
      };
      break;
    default:
      return state;
  }
};
