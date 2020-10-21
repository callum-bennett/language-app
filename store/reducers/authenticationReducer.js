import { AUTHENTICATE_USER } from "../actions/authentication";

const initialState = {
  authenticated: false,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      const { token } = action.payload;
      return {
        authenticated: true,
        token,
      };
      break;

    default:
      return state;
  }
};
