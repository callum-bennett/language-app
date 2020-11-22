import apiV1Client from "../../api/apiv1client";
export const FETCH_BADGES = "fetch_badges";
export const FETCH_USER_BADGES = "fetch_user_badges";

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
