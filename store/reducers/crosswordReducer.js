import {
  ENTER_CHARACTER,
  SET_ACTIVE_ANSWER,
  SET_ACTIVE_CELL,
  START_CROSSWORD,
  CLEAR_ACTIVE_ANSWER,
  SHOW_ANSWERS,
} from "../actions/crossword";
import { arrayToObjectByKey } from "../../util";

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
      const crosswordWords = action.payload;

      const answersByKey = arrayToObjectByKey(crosswordWords, "text");
      Object.keys(answersByKey).forEach((key) => {
        answersByKey[key].progress = Array.from(Array(key.length));
        answersByKey[key].status = ANSWER_INCOMPLETE;
      });

      return {
        ...state,
        initialized: true,
        answers: answersByKey,
      };

      break;
    }

    case SET_ACTIVE_ANSWER: {
      const { answerText, col, row } = action.payload;
      let newState = { ...state, activeAnswerText: answerText };

      const answer = state.answers[answerText];
      const inProgress = answer.progress.some((char) => char);

      if (inProgress) {
        newState.activeCell = answer.cells.find(
          ({ x, y }) => x - 1 === col && y - 1 === row
        );
      } else if (
        !state.activeCell ||
        !answer.cells.includes(state.activeCell)
      ) {
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

    case ENTER_CHARACTER: {
      const { character, col, row } = action.payload;

      let newState = { ...state, dirty: true };

      const { answers, activeCell, activeAnswerText } = state;
      const activeAnswer = answers[activeAnswerText];

      Object.keys(newState.answers).forEach((key) => {
        const answer = newState.answers[key];
        const pos = answer.cells.findIndex(
          ({ x, y }) => x - 1 === col && y - 1 === row
        );
        if (pos > -1) {
          answer.progress[pos] = character;
        }
      });

      const posInActiveAnswer = activeAnswer.cells.findIndex(
        ({ x, y }) => x === activeCell.x && y === activeCell.y
      );

      if (posInActiveAnswer < activeAnswer.cells.length - 1) {
        newState.activeCell = activeAnswer.cells[posInActiveAnswer + 1];
      } else {
        newState.activeCell = null;
        newState.activeAnswerText = null;
      }

      return newState;
      break;
    }

    case SHOW_ANSWERS: {
      let newState = { ...state };

      Object.values(newState.answers).forEach((answer) => {
        answer.progress = answer.text.split("");
      });

      return newState;
    }

    case SET_ACTIVE_CELL: {
      const cell = action.payload;

      return {
        ...state,
        activeCell: cell,
      };
      break;
    }

    default:
      return state;
  }
};
