import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import * as Colors from "../constants/Colors";
import StepIndicator from "react-native-step-indicator";
import { selectLessonById } from "../store/selectors/lesson";

const ProgressHeader = (props) => {
  const { lessonId } = props;
  const [lesson, lessonProgress, components] = useSelector((state) => [
    selectLessonById(state, lessonId),
    state.lessons.userProgress[lessonId],
    state.lessons.components.byId,
  ]);

  const labels = lesson.lessonComponentInstances.map(
    (id) => components[id].name
  );
  let activeStep = 0;
  if (lessonProgress) {
    const { activeComponent } = lessonProgress;
    activeStep = activeComponent
      ? Object.keys(components).indexOf(activeComponent.toString())
      : Object.keys(components).length;
  }

  return (
    <View style={styles.container}>
      <StepIndicator
        stepCount={labels.length}
        customStyles={{
          stepIndicatorSize: 12,
          currentStepIndicatorSize: 12,
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
          stepIndicatorLabelFontSize: 0,
          currentStepIndicatorLabelFontSize: 0,
          stepIndicatorLabelCurrentColor: Colors.accent,
          stepIndicatorLabelFinishedColor: "#ffffff",
          stepIndicatorLabelUnFinishedColor: "#aaaaaa",
          labelColor: "#999999",
          currentStepLabelColor: Colors.accent,
        }}
        currentPosition={activeStep}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
    width: 80,
  },
});

export default ProgressHeader;
