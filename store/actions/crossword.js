export const UPDATE_ANSWER = "update_answer";
export const START_CROSSWORD = "start_crossword";
export const SET_ACTIVE_ANSWER = "set_active_answer";
export const CLEAR_ACTIVE_ANSWER = "clear_active_answer";
export const MARK_ANSWER_CORRECT = "mark_answer_correct";
export const INSERT_ANSWER = "insert_answer";

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
