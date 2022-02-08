import apiV1Client from "@api/apiv1client";
import { FETCH_BADGES, FETCH_USER_BADGES } from "./types";

export const fetchBadges = () => async (dispatch) => {
  try {
    const res = await apiV1Client.get("/badge");

    if (res.data) {
      dispatch({
        type: FETCH_BADGES,
        payload: JSON.parse(res.data),
      });
    }
  } catch (err) {}
};

export const fetchUserBadges = () => async (dispatch) => {
  try {
    const res = await apiV1Client.get(`/user_badge`);

    if (res.data) {
      dispatch({
        type: FETCH_USER_BADGES,
        payload: JSON.parse(res.data),
      });
    }
  } catch (err) {}
};
