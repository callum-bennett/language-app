import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Lesson from "../components/Lesson";
import { useSelector } from "react-redux";
import { selectWordsByCategoryId } from "../store/selectors/word";
import AppText from "../components/AppText";

const CategoryLessonScreen = (props) => {
  const categoryId = props.navigation.getParam("categoryId");
  const words = useSelector((state) =>
    selectWordsByCategoryId(state, categoryId)
  );

  const [lessonStarted, setLessonStarted] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);

  const handleStartLesson = () => {
    setLessonStarted(true);
  };

  const handleCompleteLesson = () => {
    setLessonComplete(true);
  };

  return (
    <View style={styles.screen}>
      {!lessonStarted ? (
        <Button title="Start learning!" onPress={handleStartLesson} />
      ) : !lessonComplete ? (
        // @todo remove slice
        <Lesson words={words.slice(0, 5)} onComplete={handleCompleteLesson} />
      ) : (
        <View>
          <AppText>Complete!</AppText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryLessonScreen;
