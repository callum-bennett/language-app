import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import wordReducer from "./reducers/wordReducer";
import categoryReducer from "./reducers/categoryReducer";
import crosswordReducer from "./reducers/crosswordReducer";
import lessonReducer from "./reducers/lessonReducer";
import userVocabularyReducer from "./reducers/userVocabularyReducer";

const rootReducer = combineReducers({
  categories: categoryReducer,
  words: wordReducer,
  lessons: lessonReducer,
  userVocabulary: userVocabularyReducer,
  crossword: crosswordReducer,
});

export default createStore(rootReducer, applyMiddleware(reduxThunk));
