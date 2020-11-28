import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppText from "./UI/AppText";
import AppButton from "./UI/AppButton";
import { useSelector } from "react-redux";

const LESSON_IN_PROGRESS = 0;
const LESSON_COMPLETED = 1;

const CategoryLessonList = (props) => {
  const { lessons } = props;

  const userProgress = useSelector(({ lessons }) => lessons.userProgress);

  const getLessonAction = (lesson, available) => {
    const lessonProgress = userProgress[lesson.id];

    let content;
    if (available) {
      if (!lessonProgress) {
        content = (
          <AppButton onPress={() => props.onPressLearn(lesson)}>
            Start lesson
          </AppButton>
        );
      } else if (lessonProgress.status === LESSON_IN_PROGRESS) {
        content = (
          <AppButton onPress={() => props.onPressLearn(lesson)}>
            Continue lesson
          </AppButton>
        );
      } else content = <AppText style={{ fontSize: 18 }}>Complete!</AppText>;
    } else {
      content = <AppButton disabled>Locked</AppButton>;
    }

    return content;
  };

  let available = true;

  return (
    <View style={styles.lessonContainer}>
      {lessons.length ? (
        Object.values(lessons).map((lesson, i) => {
          const content = getLessonAction(lesson, available);
          available = userProgress[lesson.id]?.status === LESSON_COMPLETED;
          return (
            <View key={i}>
              <AppText style={styles.sectionHeading}>Lesson {i + 1}</AppText>
              <View style={styles.buttonContainer}>{content}</View>
            </View>
          );
        })
      ) : (
        <AppText style={styles.noLessons}>
          There are no lessons available.
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  lessonContainer: {
    marginTop: 20,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "auto",
    margin: 20,
  },
});

export default CategoryLessonList;
