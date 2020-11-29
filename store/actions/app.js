import apiV1Client from "../../api/apiv1client";
import { CLEAR_NOTIFICATIONS, SET_NOTIFICATIONS } from "./types";

export const setNotifications = (notifications) => {
  return {
    payload: notifications,
    type: SET_NOTIFICATIONS,
  };
};

export const clearNotifications = (type) => async (dispatch) => {
  const res = await apiV1Client.post("/user/clear_notifications", { type });

  if (res.data) {
    dispatch({
      payload: type,
      type: CLEAR_NOTIFICATIONS,
    });
  }
};
