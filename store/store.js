import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import wordReducer from "./reducers/wordReducer";
import categoryReducer from "./reducers/categoryReducer";

const rootReducer = combineReducers({
  categories: categoryReducer,
  words: wordReducer,
});

export default createStore(rootReducer, applyMiddleware(reduxThunk));
