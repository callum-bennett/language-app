import { selectWordsByCategoryId } from "./word";

export const selectUserVocabularyByCategoryId = (state, categoryId) => {
  const wordIds = selectWordsByCategoryId(state, categoryId).map(
    (word) => word.id
  );

  return Object.assign(
    {},
    ...wordIds.map((id) => ({
      [id]: state.userVocabulary.byWordId[id],
    }))
  );
};
