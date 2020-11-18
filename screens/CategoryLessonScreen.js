import React from "react";
import { StyleSheet, View } from "react-native";
import LessonComponent, {
  LESSON_TYPE_CROSSWORD,
  LESSON_TYPE_MULTIPLE_CHOICE,
  LESSON_TYPE_SLIDES,
} from "../components/LessonComponent";
import { useDispatch, useSelector } from "react-redux";
import { selectWordsByLessonId } from "../store/selectors/word";
import {
  selectActiveComponentKey,
  selectLessonProgress,
} from "../store/selectors/lesson";
import Crossword from "../components/Lesson/Crossword";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { selectUserVocabularyByLessonId } from "../store/selectors/userVocabulary";
import { ActivityIndicator } from "react-native-paper";
import { advanceLesson } from "../store/actions/lessons";
import { submitAttempt } from "../store/actions/words";

const CategoryLessonScreen = (props) => {
  const dispatch = useDispatch();
  const lessonId = props.route.params.lessonId;
  const [
    words,
    userLessonVocabulary,
    lessonProgress,
    activeComponentKey,
  ] = useSelector((state) => [
    selectWordsByLessonId(state, lessonId),
    selectUserVocabularyByLessonId(state, lessonId),
    selectLessonProgress(state, lessonId),
    selectActiveComponentKey(state, lessonId),
  ]);

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

  const handleSubmitAnswer = (wordId, correct) => {
    dispatch(submitAttempt(lessonId, wordId, correct));
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
          <LessonComponent
            words={words}
            start={startSlide}
            onComplete={handleCompleteComponent}
            type={activeComponentKey}
            onSubmitAnswer={handleSubmitAnswer}
          />
        ) : activeComponentKey === LESSON_TYPE_CROSSWORD ? (
          <Crossword words={words} onComplete={handleCompleteComponent} />
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
