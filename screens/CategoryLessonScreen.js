import React, { useState } from "react";
import { Button, StyleSheet, TouchableOpacity, View } from "react-native";
import Lesson from "../components/Lesson";
import { useSelector } from "react-redux";
import { selectWordsByCategoryId } from "../store/selectors/word";
import Crossword from "../components/Lesson/Crossword";
import AppText from "../components/AppText";

const CategoryLessonScreen = (props) => {
  const categoryId = props.navigation.getParam("categoryId");
  const words = useSelector((state) =>
    selectWordsByCategoryId(state, categoryId)
  );

  const [lessonStarted, setLessonStarted] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const handleStartLesson = () => {
    setLessonStarted(true);
  };

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
        <Lesson words={words.slice(0, 10)} onComplete={handleCompleteLesson} />
      ) : gameComplete ? (
        <Crossword words={words.slice(0, 10)} onComplete={handleCompleteGame} />
      ) : (
        <AppText onPress={handleSectionComplete}>Section Complete!</AppText>
      )}
    </View>
  );
};

CategoryLessonScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("title");

  return {
    headerTitle: title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryLessonScreen;
