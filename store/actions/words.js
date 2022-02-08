import apiV1Client from "@api/apiv1client";
import {
  ADD_USER_VOCABULARY,
  FETCH_USER_VOCABULARY,
  FETCH_WORDS,
} from "./types";

export const fetchWords = () => async (dispatch) => {
  const res = await apiV1Client.get("/word");

  if (res.data.length) {
    dispatch({
      type: FETCH_WORDS,
      payload: JSON.parse(res.data),
    });
  }
};

export const fetchUserVocabulary = () => async (dispatch) => {
  const res = await apiV1Client.get("/user_vocabulary");

  if (res.data) {
    dispatch({
      type: FETCH_USER_VOCABULARY,
      payload: JSON.parse(res.data),
    });
  }
};

export const markWordAsSeen = (id) => async (dispatch) => {
  try {
    const res = await apiV1Client.post(`/word/${id}/mark_seen`);

    if (res.data) {
      dispatch({
        type: ADD_USER_VOCABULARY,
        payload: JSON.parse(res.data),
      });
    }
  } catch (err) {}
};
