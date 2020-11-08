export const selectLessonsByCategoryId = (state, categoryId) => {
  return Object.values(state.lessons.byId).filter(
    (lesson) => lesson.category === categoryId
  );
};

export const selectLessonStatus = (state, lessonId) => {
  return state.lessons.userProgress[lessonId] ?? null;
};
