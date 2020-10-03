export const selectActiveAnswer = (crossword) => crossword.activeAnswer;
export const selectAnswers = (crossword) => crossword.answers;
export const selectCompletionStatus = (crossword) => crossword.complete;
export const selectInitialized = (crossword) => crossword.initialized;
export const selectAllAnswersAttempted = (crossword) =>
  Object.values(crossword.answers).every((answer) =>
    answer.progress.every((char) => char)
  );
