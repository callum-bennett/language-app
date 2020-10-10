import { FETCH_USER_VOCABULARY } from "../actions/words";
import { arrayToObjectByKey } from "../../util";

const initialState = {
  byWordId: {},
  allIds: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_VOCABULARY:
      const vocabulary = action.payload;

      return {
        ...state,
        byWordId: arrayToObjectByKey(vocabulary, "word"),
        allWordIds: vocabulary.map((item) => item.word),
      };
      break;

    default:
      return state;
  }
};
