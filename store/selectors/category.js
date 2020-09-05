export const selectCategoriesAsArray = (state) =>
  Object.values(state.categories.byId);

export const selectCategoryById = (state, id) => state.categories.byId[id];
