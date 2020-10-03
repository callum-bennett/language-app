export const ENTER_CHARACTER = "enter_character";
export const START_CROSSWORD = "start_crossword";
export const SET_ACTIVE_CELL = "set_active_cell";
export const SET_ACTIVE_ANSWER = "set_active_answer";
export const CLEAR_ACTIVE_ANSWER = "clear_active_answer";
export const SHOW_ANSWERS = "show_answers";

export const startCrossword = (answers) => {
  return {
    type: START_CROSSWORD,
    payload: answers,
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

export const enterCharacter = (character, col, row) => {
  return {
    type: ENTER_CHARACTER,
    payload: {
      character,
      col,
      row,
    },
  };
};

export const showAnswers = () => {
  return {
    type: SHOW_ANSWERS,
  };
};
