import { CLEAR_NOTIFICATIONS, SET_NOTIFICATIONS } from "./types";

export const setNotifications = (notifications) => {
  return {
    payload: notifications,
    type: SET_NOTIFICATIONS,
  };
};

export const clearNotifications = (type, apiV1Client) => async (dispatch) => {
  const res = await apiV1Client.post("/user/clear_notifications", { type });

  if (res.data) {
    dispatch({
      payload: type,
      type: CLEAR_NOTIFICATIONS,
    });
  }
};
