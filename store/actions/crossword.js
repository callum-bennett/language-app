export const ENTER_CHARACTER = "enter_character";
export const START_CROSSWORD = "start_crossword";
export const SET_ACTIVE_CELL = "set_active_cell";
export const SET_ACTIVE_ANSWER = "set_active_answer";
export const CHECK_ANSWER_STATUS = "check_answer_status";

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

export const setActiveAnswer = (answer) => {
  return {
    type: SET_ACTIVE_ANSWER,
    payload: answer,
  };
};

export const unsetActiveAnswer = () => {
  return {
    type: SET_ACTIVE_ANSWER,
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

export const checkAnswerStatus = (answerText) => {
  return {
    type: CHECK_ANSWER_STATUS,
    payload: answerText,
  };
};
