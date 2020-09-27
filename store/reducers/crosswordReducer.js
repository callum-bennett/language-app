import {
  ENTER_CHARACTER,
  SET_ACTIVE_ANSWER,
  SET_ACTIVE_CELL,
  START_CROSSWORD,
  CHECK_ANSWER_STATUS,
} from "../actions/crossword";
import { arrayToObjectByKey } from "../../util";

const initialState = {
  initialized: false,
  activeCell: null,
  activeAnswer: null,
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
      const answer = action.payload;

      return {
        ...state,
        activeAnswer: answer,
      };
      break;
    }

    case ENTER_CHARACTER: {
      const { character, col, row } = action.payload;

      let updatedAnswers = { ...state.answers };
      Object.keys(updatedAnswers).forEach((key) => {
        const answer = updatedAnswers[key];
        const pos = answer.cells.findIndex(
          (cell) => cell.x - 1 === col && cell.y - 1 === row
        );
        if (pos > -1) {
          answer.progress[pos] = character;
        }
      });

      return {
        ...state,
        answers: updatedAnswers,
        dirty: true,
      };
      break;
    }

    case CHECK_ANSWER_STATUS: {
      const answerText = action.payload;
      const answer = state.answers[answerText];
      const charsAttempted = answer.progress.filter((char) => char);

      if (charsAttempted.length === answer.text.length) {
        if (answer.text == answer.progress.join("")) {
          answer.status = ANSWER_CORRECT;

          const correctCount = Object.values(state.answers).filter(
            ({ status }) => status === ANSWER_CORRECT
          );

          if (correctCount === state.answers.length) {
            state.complete = true;
          }
        } else {
          // @todo mark word as incorrect
          answer.status = ANSWER_INCORRECT;
        }

        return {
          ...state,
          activeAnswer: null,
          answers: {
            ...state.answers,
            [answerText]: answer,
          },
        };
      }
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
