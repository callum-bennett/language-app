import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import wordReducer from "./reducers/wordReducer";
import categoryReducer from "./reducers/categoryReducer";
import crosswordReducer from "./reducers/crosswordReducer";
import lessonReducer from "./reducers/lessonReducer";
import userVocabularyReducer from "./reducers/userVocabularyReducer";
import authenticationReducer from "./reducers/authenticationReducer";
import badgeReducer from "./reducers/badgeReducer";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  categories: categoryReducer,
  words: wordReducer,
  lessons: lessonReducer,
  userVocabulary: userVocabularyReducer,
  crossword: crosswordReducer,
  badges: badgeReducer,
});

export default createStore(rootReducer, applyMiddleware(reduxThunk));
