import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";

import apiV1Client from "@api/apiv1client";
import Crossword from "@components/Lesson/Crossword/Crossword";
import UIButton from "@components/UI/UIButton";
import UIText from "@components/UI/UIText";
import Component, {
  LESSON_TYPE_CROSSWORD,
  LESSON_TYPE_MULTIPLE_CHOICE,
  LESSON_TYPE_SLIDES,
} from "@components/Lesson/Component";

import { advanceLesson } from "@store/actions/lessons";
import {
  selectActiveComponent,
  selectLessonProgress,
  selectUserVocabularyByLessonId,
  selectCategoryByLessonId,
  selectWordsByLessonId,
} from "@store/selectors";

import { crosswordConfig } from "../data/crosswords";

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
    const vocabLength = Object.values(userLessonVocabulary).filter(
      (v) => v
    ).length;
    startSlide = vocabLength;
    if (vocabLength === words.length) {
      startSlide--;
    }
  } else if (activeComponentKey === LESSON_TYPE_MULTIPLE_CHOICE) {
    if (lessonProgress.responses[activeComponentKey]) {
      startSlide = Object.keys(
        lessonProgress.responses[activeComponentKey]
      ).length;
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
            <UIText style={styles.completeText}>Lesson complete!</UIText>
            <UIButton onPress={handleSectionComplete}>Continue</UIButton>
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
            <UIText>Oops! Something went wrong</UIText>
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
