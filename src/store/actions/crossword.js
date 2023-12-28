import {
  CLEAR_ACTIVE_ANSWER,
  INSERT_ANSWER,
  MARK_ANSWER_CORRECT,
  SET_ACTIVE_ANSWER,
  START_CROSSWORD,
  UPDATE_ANSWER,
} from "./types";

export const startCrossword = (config) => ({
  type: START_CROSSWORD,
  payload: config,
});

export const setActiveAnswer = (answerText, col, row) => ({
  type: SET_ACTIVE_ANSWER,
  payload: {
    answerText,
    col,
    row,
  },
});

export const clearActiveAnswer = () => ({
  type: CLEAR_ACTIVE_ANSWER,
  payload: null,
});

export const updateAnswer = (text) => ({
  type: UPDATE_ANSWER,
  payload: text,
});

export const markAnswerCorrect = (answer) => ({
  type: MARK_ANSWER_CORRECT,
  payload: answer,
});

export const insertAnswer = (answer) => ({
  type: INSERT_ANSWER,
  payload: answer,
});
