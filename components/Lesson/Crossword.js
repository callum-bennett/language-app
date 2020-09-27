import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { people1 as crosswordConfig } from "../../data/crosswords";

import Grid from "../Game/Crossword/Grid";
import Clues from "../Game/Crossword/Clues";
import { useDispatch, useSelector } from "react-redux";
import { setActiveAnswer, startCrossword } from "../../store/actions/crossword";
import AppButton from "../AppButton";

const Crossword = (props) => {
  const dispatch = useDispatch();
  const [complete, dirty, initialized] = useSelector(({ crossword }) => [
    crossword.complete,
    crossword.dirty,
    crossword.initialized,
  ]);

  useEffect(() => {
    dispatch(startCrossword(crosswordConfig.answers));
  }, [0]);

  const handleReset = () => {
    dispatch(startCrossword(crosswordConfig.answers));
  };

  const handleTouchAway = () => {
    Keyboard.dismiss();
    dispatch(setActiveAnswer(null));
  };

  return initialized ? (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={handleTouchAway}>
          <View style={styles.container}>
            <Clues words={props.words} />
            <Grid />
            {complete && <AppButton>Continue</AppButton>}
            {dirty && (
              <View style={styles.buttonContainer}>
                <AppButton onPress={handleReset}>Reset</AppButton>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  ) : (
    <Text>Loading...</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    width: "100%",
  },
  buttonContainer: {
    // @todo remove this style
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
});

export default Crossword;
