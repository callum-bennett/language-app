import { FETCH_LESSONS } from "../actions/lessons";
import { arrayToObjectByKey } from "../../util";
import { FETCH_CATEGORY_PROGRESS } from "../actions/categories";

const initialState = {
  byId: {},
  allIds: {},
  userProgress: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LESSONS: {
      const lessons = action.payload;

      return {
        ...state,
        byId: arrayToObjectByKey(lessons),
        allIds: lessons.map((lesson) => lesson.id),
      };
      break;
    }

    case FETCH_CATEGORY_PROGRESS: {
      const { lessonProgress, lessons } = action.payload;

      const progressByLessonId = arrayToObjectByKey(lessonProgress, "lesson");

      let userProgress = {};
      if (state.allIds.length > 0) {
        state.allIds.forEach((lessonId) => {
          userProgress[lessonId] = progressByLessonId[lessonId]?.status ?? null;
        });
      }

      return {
        ...state,
        lessons: lessons,
        userProgress,
      };
    }

    default:
      return state;
  }
};
