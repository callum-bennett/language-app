import React from "react";
import { StyleSheet, View } from "react-native";
import Component, {
  LESSON_TYPE_CROSSWORD,
  LESSON_TYPE_MULTIPLE_CHOICE,
  LESSON_TYPE_SLIDES,
} from "../components/Lesson/Component";
import { useDispatch, useSelector } from "react-redux";
import { selectWordsByLessonId } from "../store/selectors/word";
import {
  selectActiveComponent,
  selectLessonProgress,
} from "../store/selectors/lesson";
import Crossword from "../components/Lesson/Crossword";
import AppButton from "../components/UI/AppButton";
import AppText from "../components/UI/AppText";
import { selectUserVocabularyByLessonId } from "../store/selectors/userVocabulary";
import { ActivityIndicator } from "react-native-paper";
import { advanceLesson } from "../store/actions/lessons";
import { selectCategoryByLessonId } from "../store/selectors/category";
import { crosswordConfig } from "../data/crosswords";
import apiV1Client from "../api/apiv1client";

const CategoryLessonScreen = (props) => {
  const dispatch = useDispatch();
  const lessonId = props.route.params.lessonId;
  const [
    words,
    userLessonVocabulary,
    lessonProgress,
    activeComponent,
    category,
    lesson,
  ] = useSelector((state) => [
    selectWordsByLessonId(state, lessonId),
    selectUserVocabularyByLessonId(state, lessonId),
    selectLessonProgress(state, lessonId),
    selectActiveComponent(state, lessonId),
    selectCategoryByLessonId(state, lessonId),
    state.lessons.byId[lessonId],
  ]);

  const activeComponentKey = activeComponent?.shortname;

  let startSlide = 0;

  if (activeComponentKey === LESSON_TYPE_SLIDES) {
    const vocabLength = Object.values(userLessonVocabulary).filter((v) => v)
      .length;
    startSlide = vocabLength;
    if (vocabLength === words.length) {
      startSlide--;
    }
  } else if (activeComponentKey === LESSON_TYPE_MULTIPLE_CHOICE) {
    if (lessonProgress.responses[activeComponentKey]) {
      startSlide = Object.keys(lessonProgress.responses[activeComponentKey])
        .length;
    }
  }

  const handleCompleteComponent = async () => {
    dispatch(advanceLesson(lessonId));
  };

  const handleSectionComplete = () => {
    props.navigation.pop();
  };

  const handleSubmitAnswer = async (wordId, userAnswer, correct) => {
    try {
      await apiV1Client.post(`/lesson/${lessonId}/submitAnswer`, {
        wordId,
        userAnswer,
        correct,
      });
    } catch (e) {}
  };

  return (
    <View style={styles.screen}>
      {lessonProgress ? (
        lessonProgress.status === 1 ? (
          <>
            <AppText style={styles.completeText}>Lesson complete!</AppText>
            <AppButton onPress={handleSectionComplete}>Continue</AppButton>
          </>
        ) : [LESSON_TYPE_SLIDES, LESSON_TYPE_MULTIPLE_CHOICE].includes(
            activeComponentKey
          ) ? (
          <Component
            key={activeComponentKey}
            words={words}
            start={startSlide}
            onComplete={handleCompleteComponent}
            component={activeComponent}
            onSubmitAnswer={handleSubmitAnswer}
          />
        ) : activeComponentKey === LESSON_TYPE_CROSSWORD ? (
          <Crossword
            config={
              crosswordConfig[category.name.toLowerCase()][lesson.sequence]
            }
            words={words}
            onComplete={handleCompleteComponent}
            onSubmitAnswer={handleSubmitAnswer}
            responses={lessonProgress.responses?.crossword}
          />
        ) : (
          <View>
            <AppText>Oops! Something went wrong</AppText>
          </View>
        )
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  completeText: {
    fontSize: 28,
    marginBottom: 40,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryLessonScreen;
