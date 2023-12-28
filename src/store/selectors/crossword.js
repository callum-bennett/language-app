import { ANSWER_INCOMPLETE } from "../reducers/crosswordReducer";

export const selectActiveAnswer = (crossword) => {
  let activeAnswer = null;
  if (crossword.activeAnswerText) {
    activeAnswer = crossword.answers[crossword.activeAnswerText];
  }
  return activeAnswer;
};
export const selectAnswers = (crossword) => crossword.answers;
export const selectCompletionStatus = (crossword) => crossword.complete;
export const selectInitialized = (crossword) => crossword.initialized;
export const selectCompleteCount = (crossword) =>
  Object.values(crossword.answers).filter(
    (answer) => answer.status !== ANSWER_INCOMPLETE
  ).length;
