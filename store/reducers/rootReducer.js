import appReducer from "./appReducer";
import authenticationReducer from "./authenticationReducer";
import badgeReducer from "./badgeReducer";
import categoryReducer from "./categoryReducer";
import crosswordReducer from "./crosswordReducer";
import lessonReducer from "./lessonReducer";
import userVocabularyReducer from "./userVocabularyReducer";
import wordReducer from "./wordReducer";
import { combineReducers } from "redux";

export default combineReducers({
  authentication: authenticationReducer,
  app: appReducer,
  categories: categoryReducer,
  words: wordReducer,
  lessons: lessonReducer,
  userVocabulary: userVocabularyReducer,
  crossword: crosswordReducer,
  badges: badgeReducer,
});
