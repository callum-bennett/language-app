import {
  CLEAR_ACTIVE_ANSWER,
  INSERT_ANSWER,
  MARK_ANSWER_CORRECT,
  SET_ACTIVE_ANSWER,
  START_CROSSWORD,
  UPDATE_ANSWER,
} from "./types";

export const startCrossword = (config) => {
  return {
    type: START_CROSSWORD,
    payload: config,
  };
};

export const setActiveAnswer = (answerText, col, row) => {
  return {
    type: SET_ACTIVE_ANSWER,
    payload: {
      answerText,
      col,
      row,
    },
  };
};

export const clearActiveAnswer = () => {
  return {
    type: CLEAR_ACTIVE_ANSWER,
    payload: null,
  };
};

export const updateAnswer = (text) => {
  return {
    type: UPDATE_ANSWER,
    payload: text,
  };
};

export const markAnswerCorrect = (answer) => {
  return {
    type: MARK_ANSWER_CORRECT,
    payload: answer,
  };
};

export const insertAnswer = (answer) => {
  return {
    type: INSERT_ANSWER,
    payload: answer,
  };
};
