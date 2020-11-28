import apiV1Client from "../../api/apiv1client";
export const ADVANCE_LESSON = "advance_lesson";
export const START_LESSON = "start_lesson";
export const FETCH_LESSONS = "fetch_lessons";
export const FETCH_LESSON_COMPONENTS = "fetch_lesson_components";

export const fetchLessons = () => async (dispatch) => {
  try {
    const res = await apiV1Client.get("/lesson");

    if (res.data) {
      dispatch({
        type: FETCH_LESSONS,
        payload: JSON.parse(res.data),
      });
    }
  } catch (err) {}
};

export const advanceLesson = (lessonId) => async (dispatch) => {
  try {
    const res = await apiV1Client.patch(`/lesson/${lessonId}/advance`);

    if (res.data) {
      dispatch({
        type: ADVANCE_LESSON,
        payload: JSON.parse(res.data),
      });
    }
  } catch (err) {}
};

export const startLesson = (lessonId) => async (dispatch) => {
  try {
    const res = await apiV1Client.patch(`/lesson/${lessonId}/start`);

    if (res.data) {
      dispatch({
        type: START_LESSON,
        payload: JSON.parse(res.data),
      });
      return true;
    }
  } catch (e) {}
};

export const fetchLessonComponents = () => async (dispatch) => {
  try {
    const res = await apiV1Client.get("/lesson_component");

    if (res.data) {
      dispatch({
        type: FETCH_LESSON_COMPONENTS,
        payload: JSON.parse(res.data),
      });
    }
  } catch (err) {}
};
