import apiV1Client from "../../api/apiv1client";
import { SET_NOTIFICATIONS } from "./types";

export const setNotifications = (notifications) => {
  return {
    payload: notifications,
    type: SET_NOTIFICATIONS,
  };
};

export const clearNotifications = (type) => async (dispatch) => {
  // const res = await apiV1Client.patch("/user/clear_notifications", { type });
  //
  // dispatch()
};
