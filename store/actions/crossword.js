export const UPDATE_ANSWER = "update_answer";
export const START_CROSSWORD = "start_crossword";
export const SET_ACTIVE_CELL = "set_active_cell";
export const SET_ACTIVE_ANSWER = "set_active_answer";
export const CLEAR_ACTIVE_ANSWER = "clear_active_answer";
export const SHOW_ANSWERS = "show_answers";
export const CHECK_ANSWERS = "check_answers";
export const MARK_ANSWER_CORRECT = "mark_answer_correct";

export const startCrossword = (config) => {
  return {
    type: START_CROSSWORD,
    payload: config,
  };
};

export const setActiveCell = (cell) => {
  return {
    type: SET_ACTIVE_CELL,
    payload: cell,
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

export const showAnswers = () => {
  return {
    type: SHOW_ANSWERS,
  };
};

export const checkAnswers = () => {
  return {
    type: CHECK_ANSWERS,
  };
};

export const markAnswerCorrect = (answer) => {
  return {
    type: MARK_ANSWER_CORRECT,
    payload: answer,
  };
};
