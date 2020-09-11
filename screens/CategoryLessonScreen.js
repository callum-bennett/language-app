import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Lesson from "../components/Lesson";
import { useSelector } from "react-redux";
import { selectWordsByCategoryId } from "../store/selectors/word";

const CategoryLessonScreen = (props) => {
  const categoryId = props.navigation.getParam("categoryId");
  const words = useSelector((state) =>
    selectWordsByCategoryId(state, categoryId)
  );

  const [lessonStarted, setLessonStarted] = useState(false);

  const handleStartLesson = () => {
    setLessonStarted(true);
  };

  return (
    <View style={styles.screen}>
      {!lessonStarted ? (
        <Button title="Start learning!" onPress={handleStartLesson} />
      ) : (
        <Lesson words={words} />
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
