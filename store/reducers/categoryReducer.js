import { arrayToObjectByKey } from "../../util";
import { FETCH_CATEGORIES } from "../actions/types";

const initialState = {
  byId: {},
  allIds: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      const categories = action.payload;

      return {
        ...state,
        byId: arrayToObjectByKey(categories),
        allIds: categories.map((category) => category.id),
      };
      break;

    default:
      return state;
  }
};
