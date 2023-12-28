import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import StepIndicator from "react-native-step-indicator";

import Button from "@components/ui/Button";
import Text from "@components/ui/Text";
import * as Colors from "@constants/Colors";

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
          <Button onPress={() => props.onPressLearn(lesson)}>
            Start lesson
          </Button>
        );
      } else if (lessonProgress.status === LESSON_IN_PROGRESS) {
        content = (
          <Button onPress={() => props.onPressLearn(lesson)}>
            Continue lesson
          </Button>
        );
      } else content = <Text style={{ fontSize: 18 }}>Complete!</Text>;
    } else {
      content = <Button disabled>Locked</Button>;
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
              <Text style={styles.sectionHeading}>{name}</Text>
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
        <Text style={styles.noLessons}>There are no lessons available.</Text>
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
