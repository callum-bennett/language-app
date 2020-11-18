export const selectLessonsByCategoryId = (state, categoryId) => {
  return Object.values(state.lessons.byId).filter(
    (lesson) => lesson.category === categoryId
  );
};

export const selectLessonProgress = (state, lessonId) => {
  return state.lessons.userProgress[lessonId] ?? null;
};

export const selectActiveComponentKey = (state, lessonId) => {
  const progress = selectLessonProgress(state, lessonId);

  if (progress?.status === 0) {
    return state.lessons.components.byId[progress.activeComponent].shortname;
  }

  return null;
};
