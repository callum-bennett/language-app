import { arrayToObjectByKey } from "../../util";
import { ADD_USER_VOCABULARY, FETCH_USER_VOCABULARY } from "../actions/types";

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

    case ADD_USER_VOCABULARY:
      // const vocabEntry = action.payload;
      //
      // return {
      //   ...state,
      //   byWordId: {
      //     ...state.byWordId,
      //     [vocabEntry.word]: vocabEntry,
      //   },
      //   allWordIds: [...state.allWordIds, vocabEntry.word],
      // };
      break;

    default:
      return state;
  }
};
