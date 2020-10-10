import apiClient from "../../api/client";
export const FETCH_LESSONS = "fetch_lessons";

export const fetchLessons = () => async (dispatch) => {
  try {
    const res = await apiClient.get("/lesson/");

    if (res.data) {
      dispatch({
        type: FETCH_LESSONS,
        payload: JSON.parse(res.data),
      });
    }
  } catch (err) {
    console.log(err);
  }
};
