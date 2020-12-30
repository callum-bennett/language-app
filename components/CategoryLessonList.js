import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppText from "./UI/AppText";
import AppButton from "./UI/AppButton";
import { useSelector } from "react-redux";
import StepIndicator from "react-native-step-indicator";
import * as Colors from "../constants/Colors";

const LESSON_IN_PROGRESS = 0;
const LESSON_COMPLETED = 1;

const CategoryLessonList = (props) => {
  const { lessons } = props;

  const [userProgress, components] = useSelector(({ lessons }) => [
    lessons.userProgress,
    lessons.components.byId,
  ]);

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
        Object.values(lessons).map((lesson) => {
          const { id, name } = lesson;
          const content = getLessonAction(lesson, available);
          const labels = lesson.lessonComponentInstances.map(
            (id) => components[id].name
          );
          const displayStep = available;
          let activeStep = 0;
          if (userProgress[id]) {
            const { activeComponent } = userProgress[id];
            activeStep = activeComponent
              ? Object.keys(components).indexOf(activeComponent.toString())
              : Object.keys(components).length;
          }

          available = userProgress[id]?.status === LESSON_COMPLETED;

          return (
            <View key={id}>
              <AppText style={styles.sectionHeading}>{name}</AppText>
              {displayStep && (
                <StepIndicator
                  stepCount={labels.length}
                  customStyles={{
                    stepIndicatorSize: 25,
                    currentStepIndicatorSize: 30,
                    separatorStrokeWidth: 1,
                    currentStepStrokeWidth: 1,
                    stepStrokeCurrentColor: Colors.accent,
                    stepStrokeWidth: 1,
                    stepStrokeFinishedColor: Colors.accent,
                    stepStrokeUnFinishedColor: "#aaaaaa",
                    separatorFinishedColor: Colors.accent,
                    separatorUnFinishedColor: "#aaaaaa",
                    stepIndicatorFinishedColor: Colors.accent,
                    stepIndicatorUnFinishedColor: "#ffffff",
                    stepIndicatorCurrentColor: "#ffffff",
                    stepIndicatorLabelFontSize: 13,
                    currentStepIndicatorLabelFontSize: 13,
                    stepIndicatorLabelCurrentColor: Colors.accent,
                    stepIndicatorLabelFinishedColor: "#ffffff",
                    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
                    labelColor: "#999999",
                    currentStepLabelColor: Colors.accent,
                  }}
                  currentPosition={activeStep}
                  labels={labels}
                />
              )}

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
    marginBottom: 20,
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
