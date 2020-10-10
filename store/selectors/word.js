export const selectWordsByCategoryId = (state, categoryId) =>
  Object.values(state.words.byId).filter((word) =>
    word.category.includes(categoryId)
  );

export const selectWordsByLessonId = (state, lessonId) =>
  Object.values(state.words.byId).filter((word) => word.lesson === lessonId);
