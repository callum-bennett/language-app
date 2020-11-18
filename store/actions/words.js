import apiClient from "../../api/client";
export const FETCH_WORDS = "fetch_words";
export const FETCH_USER_VOCABULARY = "fetch_user_vocabulary";
export const ADD_USER_VOCABULARY = "add_user_vocabulary";

export const fetchWords = () => async (dispatch) => {
  const res = await apiClient.get("/api/word");

  if (res.data.length) {
    dispatch({
      type: FETCH_WORDS,
      payload: JSON.parse(res.data),
    });
  }
};

export const fetchUserVocabulary = () => async (dispatch) => {
  const res = await apiClient.get("/api/user_vocabulary");

  if (res.data) {
    dispatch({
      type: FETCH_USER_VOCABULARY,
      payload: JSON.parse(res.data),
    });
  }
};

export const markWordAsSeen = (id) => async (dispatch) => {
  try {
    const res = await apiClient.post(`/api/word/${id}/mark_seen`);

    if (res.data) {
      dispatch({
        type: ADD_USER_VOCABULARY,
        payload: JSON.parse(res.data),
      });
    }
  } catch (err) {}
};

export const submitAttempt = (id, wordId, correct) => async (dispatch) => {
  try {
    const res = await apiClient.post(`/api/lesson/${id}/submitAnswer`, {
      wordId,
      correct,
    });
  } catch (err) {
    console.log(err);
  }
};
