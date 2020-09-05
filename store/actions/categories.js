import apiClient from "../../api/client";
export const FETCH_CATEGORIES = "fetch_categories";

export const fetchCategories = () => async (dispatch) => {
  const res = await apiClient.get("/category/");
  if (res.data.length) {
    dispatch({
      type: FETCH_CATEGORIES,
      payload: JSON.parse(res.data),
    });
  }
};
