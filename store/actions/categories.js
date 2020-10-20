import apiClient from "../../api/client";
export const FETCH_CATEGORIES = "fetch_categories";

export const fetchCategories = () => async (dispatch) => {
  try {
    const res = await apiClient.get("/api/category");

    if (res.data) {
      dispatch({
        type: FETCH_CATEGORIES,
        payload: JSON.parse(res.data),
      });
    }
  } catch (err) {
    console.log(err);
  }
};
