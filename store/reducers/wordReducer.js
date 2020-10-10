import { FETCH_WORDS } from "../actions/words";
import { arrayToObjectByKey } from "../../util";

const initialState = {
  byId: {},
  allIds: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORDS:
      const words = action.payload;

      words.forEach((word) => {
        if (word.category.length) {
          word.category = word.category.map(({ id }) => id);
        }
        if (word.lesson) {
          word.lesson = word.lesson.id;
        }
        return word;
      });

      return {
        ...state,
        byId: arrayToObjectByKey(words),
        allIds: words.map((word) => word.id),
      };
      break;

    default:
      return state;
  }
};
