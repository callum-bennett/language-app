export const selectWordsByCategoryId = (state, categoryId) =>
  Object.values(state.words.byId).filter((word) =>
    word.category.includes(categoryId)
  );
