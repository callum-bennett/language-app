import {
  CLEAR_NOTIFICATIONS,
  SET_NOTIFICATIONS,
  SET_ONBOARDED,
  FETCH_USER_CONFIG,
  SET_TOKEN_CHECK,
} from "./types";

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

export const setOnboarded = (apiV1Client) => async (dispatch) => {
  const res = await apiV1Client.post("/user/set_onboarded");

  if (res.data) {
    dispatch({
      type: SET_ONBOARDED,
    });
  }
};

export const fetchUserConfig = (apiV1Client) => async (dispatch) => {
  const res = await apiV1Client.get("/user/get_config");

  if (res.data) {
    dispatch({
      type: FETCH_USER_CONFIG,
      payload: JSON.parse(res.data),
    });
  }
};

export const setTokenCheck = () => {
  return {
    type: SET_TOKEN_CHECK,
  };
};
