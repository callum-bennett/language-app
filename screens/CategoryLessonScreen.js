import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Lesson from "../components/Lesson";
import { useSelector } from "react-redux";
import { selectWordsByLessonId } from "../store/selectors/word";
import Crossword from "../components/Lesson/Crossword";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

const CategoryLessonScreen = (props) => {
  const lessonId = props.route.params.lessonId;
  const words = useSelector((state) => selectWordsByLessonId(state, lessonId));

  const [lessonComplete, setLessonComplete] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const handleCompleteLesson = () => {
    setLessonComplete(true);
  };

  const handleCompleteGame = () => {
    setGameComplete(true);
  };

  const handleSectionComplete = () => {
    props.navigation.pop();
  };

  return (
    <View style={styles.screen}>
      {!lessonComplete ? (
        <Lesson words={words} onComplete={handleCompleteLesson} />
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
