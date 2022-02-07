import { arrayToObjectByKey } from "@utils";
import { drawCrossword } from "../../utils/crosswordGenerator";
import {
  CLEAR_ACTIVE_ANSWER,
  INSERT_ANSWER,
  MARK_ANSWER_CORRECT,
  SET_ACTIVE_ANSWER,
  START_CROSSWORD,
  UPDATE_ANSWER,
} from "../actions/types";

const initialState = {
  initialized: false,
  activeCell: null,
  activeAnswerText: null,
  complete: false,
  answers: {},
};

export const ANSWER_INCOMPLETE = "incomplete";
export const ANSWER_CORRECT = "correct";

export default (state = initialState, action) => {
  switch (action.type) {
    case START_CROSSWORD: {
      const config = action.payload;
      const grid = drawCrossword(config);
      const answersByKey = arrayToObjectByKey(config.answers, "text");

      Object.keys(answersByKey).forEach((key) => {
        answersByKey[key].currentGuess = "";
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
        let i = 0,
          x,
          y;
        do {
          ({ x, y } = newState.activeCell = answer.cells[i]);
          i++;
        } while (state.grid[y - 1][x - 1].locked);
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
      newState.answers[activeAnswerText].cells.forEach(({ x, y }) => {
        newState.grid[y - 1][x - 1].locked = true;
        newState.grid[y - 1][x - 1].answered.add(activeAnswerText);
      });
      newState.activeAnswerText = null;

      return newState;
    }

    case INSERT_ANSWER: {
      const answerText = action.payload;
      const answerCells = state.answers[answerText].cells;

      let newState = { ...state };
      newState.answers[answerText].status = ANSWER_CORRECT;

      for (let i = 0; i < answerCells.length; i++) {
        const { x, y } = answerCells[i];
        const cell = state.grid[y - 1][x - 1];
        cell.value = answerText[i];
        cell.locked = true;
        cell.answered.add(answerText);
      }

      return newState;
    }

    case UPDATE_ANSWER: {
      const text = action.payload;
      const { answers, activeAnswerText } = state;
      const answerCells = answers[activeAnswerText].cells;

      let cell,
        i = 0,
        j = 0,
        combinedText = "";

      do {
        const { x, y } = answerCells[i];
        cell = state.grid[y - 1][x - 1];
        if (!cell.locked) {
          cell.value = text[j] ?? "";
          j++;
        }
        if (cell.value) {
          combinedText += cell.value;
        }

        i++;
      } while (i < answerCells.length && cell.value);

      let newState = {
        ...state,
        activeCell: answerCells[combinedText.length],
      };
      newState.answers[activeAnswerText].currentGuess = combinedText;

      return newState;
    }

    default:
      return state;
  }
};
