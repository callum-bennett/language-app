import { SET_NOTIFICATIONS } from "../actions/types";

const initialState = {
  notifications: {},
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

    default:
      return state;
  }
};
