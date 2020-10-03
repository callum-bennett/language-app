import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import wordReducer from "./reducers/wordReducer";
import categoryReducer from "./reducers/categoryReducer";
import crosswordReducer from "./reducers/crosswordReducer";

const rootReducer = combineReducers({
  categories: categoryReducer,
  words: wordReducer,
  crossword: crosswordReducer,
});

export default createStore(rootReducer, applyMiddleware(reduxThunk));
