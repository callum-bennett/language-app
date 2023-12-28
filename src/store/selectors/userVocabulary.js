import { selectWordsByCategoryId, selectWordsByLessonId } from "./word";

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

export const selectUserVocabularyByLessonId = (state, lessonId) => {
  const wordIds = selectWordsByLessonId(state, lessonId).map((word) => word.id);

  return Object.assign(
    {},
    ...wordIds.map((id) => ({
      [id]: state.userVocabulary.byWordId[id] ?? null,
    }))
  );
};
