import { combineReducers } from "redux";
import { SIGN_USER_OUT } from "@store/actions/types";
import appReducer from "./appReducer";
import authenticationReducer from "./authenticationReducer";
import badgeReducer from "./badgeReducer";
import categoryReducer from "./categoryReducer";
import crosswordReducer from "./crosswordReducer";
import lessonReducer from "./lessonReducer";
import userVocabularyReducer from "./userVocabularyReducer";
import wordReducer from "./wordReducer";

const combinedReducers = combineReducers({
  authentication: authenticationReducer,
  app: appReducer,
  categories: categoryReducer,
  words: wordReducer,
  lessons: lessonReducer,
  userVocabulary: userVocabularyReducer,
  crossword: crosswordReducer,
  badges: badgeReducer,
});

export default (state, action) => {
  if (action.type === SIGN_USER_OUT) {
    state = undefined;
  }

  return combinedReducers(state, action);
};
