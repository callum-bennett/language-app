import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { people1 as crosswordConfig } from "../../data/crosswords";

import Grid from "../Game/Crossword/Grid";
import Clues from "../Game/Crossword/Clues";
import {
  clearActiveAnswer,
  startCrossword,
  showAnswers,
} from "../../store/actions/crossword";
import AppButton from "../AppButton";
import { AppLoading } from "expo";
import { selectAllAnswersAttempted } from "../../store/selectors/crossword";
import { submitAttempt } from "../../store/actions/words";
import { arrayToObjectByKey } from "../../util";

const Crossword = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const [
    answers,
    dirty,
    initialized,
    allAnswersAttempted,
  ] = useSelector(({ crossword }) => [
    crossword.answers,
    crossword.dirty,
    crossword.initialized,
    selectAllAnswersAttempted(crossword),
  ]);

  useEffect(() => {
    dispatch(startCrossword(crosswordConfig.answers));
  }, [0]);

  const handleSubmit = () => {
    // @todo check answers

    if (!submitted) {
      const wordsByText = arrayToObjectByKey(props.words, "name");
      Object.values(answers).forEach((answer) => {
        const status = answer.text === answer.progress.join("");
        // @todo this should be referenced by Id
        const word = wordsByText[answer.text];
        submitAttempt(word.id, status);
      });
      setSubmitted(true);
    }
  };

  const handleShowAnswers = () => {
    dispatch(showAnswers());
  };

  const handleTouchAway = () => {
    Keyboard.dismiss();
    dispatch(clearActiveAnswer());
  };

  return initialized ? (
    <ScrollView keyboardShouldPersistTaps="always">
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={handleTouchAway}
          style={{ backgroundColor: "red", width: "100%", height: "100%" }}
        >
          <View style={styles.container}>
            <Clues words={props.words} />
            <Grid />

            <View style={styles.buttonContainer}>
              {allAnswersAttempted && !submitted && (
                <AppButton onPress={handleSubmit}>Submit answers</AppButton>
              )}
            </View>

            {/*//@ todo add this to header*/}
            {/*{dirty && (*/}
            {/*  <View style={styles.buttonContainer}>*/}
            {/*    <AppButton onPress={handleReset}>Reset</AppButton>*/}
            {/*  </View>*/}
            {/*)}*/}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  ) : (
    <AppLoading />
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  buttonContainer: {
    margin: 20,
  },
});

export default Crossword;
