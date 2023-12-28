import { arrayToObjectByKey } from "@utils";
import {
  ADVANCE_LESSON,
  FETCH_CATEGORY_PROGRESS,
  FETCH_LESSON_COMPONENTS,
  FETCH_LESSONS,
  START_LESSON,
} from "@store/actions/types";

const initialState = {
  byId: {},
  allIds: {},
  components: {
    byId: {},
    allIds: {},
  },
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

    case ADVANCE_LESSON: {
      const userProgress = action.payload;

      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          [userProgress.lesson]: userProgress,
        },
      };

      break;
    }

    case START_LESSON: {
      const userProgress = action.payload;

      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          [userProgress.lesson]: userProgress,
        },
      };
    }

    case FETCH_LESSON_COMPONENTS: {
      const components = action.payload;

      return {
        ...state,
        components: {
          byId: arrayToObjectByKey(components),
          allIds: components.map((component) => component.id),
        },
      };
      break;
    }

    case FETCH_CATEGORY_PROGRESS: {
      const { lessonProgress, lessons } = action.payload;

      const progressByLessonId = arrayToObjectByKey(lessonProgress, "lesson");

      const userProgress = {};
      if (state.allIds.length > 0) {
        state.allIds.forEach((lessonId) => {
          userProgress[lessonId] = progressByLessonId[lessonId];
        });
      }

      return {
        ...state,
        byId: arrayToObjectByKey(lessons),
        allIds: lessons.map((lesson) => lesson.id),
        userProgress,
      };
    }

    default:
      return state;
  }
};
