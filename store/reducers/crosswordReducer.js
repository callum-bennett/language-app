import {
  ENTER_CHARACTER,
  SET_ACTIVE_ANSWER,
  SET_ACTIVE_CELL,
  START_CROSSWORD,
  CLEAR_ACTIVE_ANSWER,
  SHOW_ANSWERS,
  CHECK_ANSWERS,
  MARK_ANSWER_CORRECT,
} from "../actions/crossword";
import { arrayToObjectByKey } from "../../util";
import { drawCrossword } from "../../utils/crosswordGenerator";

const initialState = {
  initialized: false,
  activeCell: null,
  activeAnswerText: null,
  complete: false,
  dirty: false,
  answers: {},
};

const ANSWER_INCOMPLETE = "incomplete";
const ANSWER_INCORRECT = "incorrect";
const ANSWER_CORRECT = "correct";

export default (state = initialState, action) => {
  switch (action.type) {
    case START_CROSSWORD: {
      const config = action.payload;
      const grid = drawCrossword(config);
      const answersByKey = arrayToObjectByKey(config.answers, "text");

      Object.keys(answersByKey).forEach((key) => {
        answersByKey[key].progress = Array.from(Array(key.length));
        answersByKey[key].status = ANSWER_INCOMPLETE;
      });

      return {
        ...state,
        grid,
        initialized: true,
        answers: answersByKey,
      };

      break;
    }

    case SET_ACTIVE_ANSWER: {
      const { answerText } = action.payload;
      let newState = { ...state, activeAnswerText: answerText };

      const answer = state.answers[answerText];

      if (!state.activeCell || !answer.cells.includes(state.activeCell)) {
        newState.activeCell = state.answers[answerText].cells[0];
      }

      return newState;

      break;
    }

    case CLEAR_ACTIVE_ANSWER: {
      return {
        ...state,
        activeAnswerText: initialState.activeAnswerText,
        activeCell: initialState.activeCell,
      };
      break;
    }

    case MARK_ANSWER_CORRECT: {
      const activeAnswerText = action.payload;

      let newState = { ...state };
      newState.answers[activeAnswerText].status = ANSWER_CORRECT;
      newState.activeAnswerText = null;

      return newState;
    }

    case ENTER_CHARACTER: {
      const { character, pos } = action.payload;
      const { answers, activeAnswerText } = state;
      const activeAnswer = answers[activeAnswerText];
      const { x, y } = activeAnswer.cells[pos];

      let newState = { ...state, dirty: true };
      newState.grid[y - 1][x - 1].value = character;

      return newState;
      break;
    }

    case SHOW_ANSWERS: {
      let newState = { ...state };

      Object.values(newState.answers).forEach((answer) => {
        answer.progress = answer.text.split("");
      });

      newState.grid.forEach((row) => {
        row.forEach((cell) => {
          if (cell) {
            cell.value = cell.correctValue;
          }
        });
      });

      return newState;
    }

    case CHECK_ANSWERS: {
      let newState = { ...state };

      Object.values(newState.answers).forEach((answer) => {
        const match = answer.text === answer.progress.join("");
        if (match) {
          answer.status = ANSWER_CORRECT;
        } else {
          answer.status = ANSWER_INCORRECT;
        }
      });

      return newState;
    }

    case SET_ACTIVE_CELL: {
      let activeCell = action.payload;

      return {
        ...state,
        activeCell,
      };
      break;
    }

    default:
      return state;
  }
};
