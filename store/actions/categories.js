import apiV1Client from "@api/apiv1client";
import { FETCH_CATEGORIES, FETCH_CATEGORY_PROGRESS } from "./types";

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
