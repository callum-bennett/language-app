import {
  FETCH_USER_CONFIG,
  SET_NOTIFICATIONS,
  SET_ONBOARDED,
  SET_TOKEN_CHECK,
} from "@store/actions/types";

const initialState = {
  notifications: {},
  onboarded: false,
  tokenCheck: false,
  configLoaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      const notifications = action.payload;
      return {
        ...state,
        notifications,
      };
      break;

    case FETCH_USER_CONFIG: {
      const { onboarded } = action.payload;
      return {
        ...state,
        onboarded,
        configLoaded: true,
      };
    }

    case SET_ONBOARDED:
      return {
        ...state,
        onboarded: true,
      };

    case SET_TOKEN_CHECK:
      return {
        ...state,
        tokenCheck: true,
      };

    default:
      return state;
  }
};
