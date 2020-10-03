import apiClient from "../../api/client";
export const FETCH_WORDS = "fetch_words";

export const fetchWords = () => async (dispatch) => {
  const res = await apiClient.get("/word/");

  if (res.data.length) {
    dispatch({
      type: FETCH_WORDS,
      payload: JSON.parse(res.data),
    });
  }
};

export const submitAttempt = (id, status) => async (dispatch) => {
  //@todo tidy up
  const res = await apiClient.put(`/${id}/attempt`, {
    status,
  });
};
