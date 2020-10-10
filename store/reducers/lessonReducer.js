import { FETCH_LESSONS } from "../actions/lessons";
import { arrayToObjectByKey } from "../../util";

const initialState = {
  byId: {},
  allIds: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LESSONS:
      const lessons = action.payload;

      return {
        ...state,
        byId: arrayToObjectByKey(lessons),
        allIds: lessons.map((lesson) => lesson.id),
      };
      break;

    default:
      return state;
  }
};
