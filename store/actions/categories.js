import apiV1Client from "../../api/apiv1client";
export const FETCH_CATEGORIES = "fetch_categories";
export const FETCH_CATEGORY_PROGRESS = "fetch_category_progress";

export const fetchCategories = () => async (dispatch) => {
  try {
    const res = await apiV1Client.get("/category");

    if (res.data) {
      dispatch({
        type: FETCH_CATEGORIES,
        payload: JSON.parse(res.data),
      });
    }
  } catch (err) {}
};

export const fetchCategoryProgress = (id) => async (dispatch) => {
  try {
    const res = await apiV1Client.get(`/category/${id}/progress`);

    if (res.data) {
      dispatch({
        type: FETCH_CATEGORY_PROGRESS,
        payload: JSON.parse(res.data),
      });
    }
  } catch (err) {}
};
