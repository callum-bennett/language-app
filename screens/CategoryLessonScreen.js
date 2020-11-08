import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Lesson from "../components/Lesson";
import { useSelector } from "react-redux";
import { selectWordsByLessonId } from "../store/selectors/word";
import { selectLessonStatus } from "../store/selectors/lesson";
import Crossword from "../components/Lesson/Crossword";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import apiClient from "../api/client";
import { selectUserVocabularyByLessonId } from "../store/selectors/userVocabulary";

const CategoryLessonScreen = (props) => {
  const lessonId = props.route.params.lessonId;
  const [words, userLessonVocabulary, lessonStatus] = useSelector((state) => [
    selectWordsByLessonId(state, lessonId),
    selectUserVocabularyByLessonId(state, lessonId),
    selectLessonStatus(state, lessonId),
  ]);

  const startSlide =
    Object.values(userLessonVocabulary).filter((v) => v).length + 1;

  const [lessonComplete, setLessonComplete] = useState(lessonStatus === 2);
  const [gameComplete, setGameComplete] = useState(lessonStatus === 3);

  const handleCompleteLesson = async () => {
    try {
      const res = await apiClient.patch(`/api/lesson/${lessonId}/finish`);
      if (res) {
        setLessonComplete(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCompleteGame = async () => {
    try {
      const res = await apiClient.patch(
        `/api/lesson/${lessonId}/finishcrossword`
      );
      if (res) {
        setGameComplete(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSectionComplete = () => {
    props.navigation.pop();
  };

  return (
    <View style={styles.screen}>
      {!lessonComplete ? (
        <Lesson
          words={words}
          start={startSlide}
          onComplete={handleCompleteLesson}
        />
      ) : !gameComplete ? (
        <Crossword words={words} onComplete={handleCompleteGame} />
      ) : (
        <>
          <AppText style={styles.completeText}>Lesson complete!</AppText>
          <AppButton onPress={handleSectionComplete}>Continue</AppButton>
        </>
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
