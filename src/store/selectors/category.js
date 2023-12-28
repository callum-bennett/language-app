export const selectCategoriesAsArray = (state) =>
  Object.values(state.categories.byId);

export const selectCategoryById = (state, id) => state.categories.byId[id];

export const selectCategoryByLessonId = (state, lessonId) => {
  const lesson = state.lessons.byId[lessonId];
  return state.categories.byId[lesson.category];
};
