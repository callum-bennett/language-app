export const selectLessonsByCategoryId = (state, categoryId) => {
  return Object.values(state.lessons.byId).filter(
    (lesson) => lesson.category === categoryId
  );
};

export const selectLessonProgress = (state, lessonId) => {
  return state.lessons.userProgress[lessonId] ?? null;
};

export const selectLessonResponsesByType = (state, lessonId, type) => {
  let responses = [];
  const lessonProgress = selectLessonProgress(state, lessonId);
  if (lessonProgress) {
    responses = lessonProgress.responses?.[type];
  }
  return responses;
};

export const selectActiveComponent = (state, lessonId) => {
  const progress = selectLessonProgress(state, lessonId);

  if (progress?.status === 0) {
    return state.lessons.components.byId[progress.activeComponent];
  }

  return null;
};
