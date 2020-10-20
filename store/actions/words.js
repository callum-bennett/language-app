import apiClient from "../../api/client";
export const FETCH_WORDS = "fetch_words";
export const FETCH_USER_VOCABULARY = "fetch_user_vocabulary";

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

  if (res.data.length) {
    dispatch({
      type: FETCH_USER_VOCABULARY,
      payload: JSON.parse(res.data),
    });
  }
};

export const markWordAsSeen = (id) => async (dispatch) => {
  //@todo tidy up
  const res = await apiClient.post(`/api/word/${id}/mark_seen`);
};

export const submitAttempt = (id, status) => async (dispatch) => {
  //@todo tidy up
  const res = await apiClient.put(`/api/word/${id}/attempt`, {
    status,
  });
};
