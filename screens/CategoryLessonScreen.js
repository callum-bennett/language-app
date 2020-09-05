import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const CategoryLessonScreen = (props) => {
  const [lessonStarted, setLessonStarted] = useState(false);

  return (
    <View style={styles.screen}>
      <Text>Category Lesson Screen</Text>
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
