import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
} from "react-native";

import { people1 as crosswordConfig } from "../../data/crosswords";
import Grid from "../Game/Crossword/Grid";
import Clues from "../Game/Crossword/Clues";
import {
  clearActiveAnswer,
  startCrossword,
  showAnswers,
  checkAnswers,
  updateAnswer,
  markAnswerCorrect,
  setActiveCell,
} from "../../store/actions/crossword";
import AppButton from "../AppButton";
import { selectCompleteCount } from "../../store/selectors/crossword";
import { submitAttempt } from "../../store/actions/words";
import { arrayToObjectByKey } from "../../util";
import AppText from "../AppText";
import * as Animatable from "react-native-animatable";
import * as Colors from "../../constants/Colors";
import { playSound } from "../../utils/sounds";
import { FEEDBACK_NEGATIVE, FEEDBACK_POSITIVE } from "../../utils/sounds";

const Crossword = (props) => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);
  const answerInputRef = useRef(null);
  const animationRef = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [focusedCell, setFocusedCell] = useState(null);
  const [solutionShown, setSolutionShown] = useState(false);
  const cellDimension = 35;

  let gridOffsetY = 0;

  const [
    activeAnswerText,
    activeCell,
    answers,
    dirty,
    grid,
    initialized,
    completedCount,
  ] = useSelector(({ crossword }) => [
    crossword.activeAnswerText,
    crossword.activeCell,
    crossword.answers,
    crossword.dirty,
    crossword.grid,
    crossword.initialized,
    selectCompleteCount(crossword),
  ]);

  const activeAnswer = answers[activeAnswerText];
  const wordsByText = arrayToObjectByKey(props.words, "name");

  useEffect(() => {
    dispatch(startCrossword(crosswordConfig));
  }, [0]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", scrollToAnswer);
    return () => {
      Keyboard.removeListener("keyboardDidShow", scrollToAnswer);
    };
  });

  const scrollToAnswer = () => {
    if (activeAnswer) {
      const index = Math.floor(activeAnswer.cells.length / 2);
      const cellOffsetY = activeAnswer.cells[index].y * cellDimension;

      scrollViewRef.current.scrollTo({
        x: 0,
        y: gridOffsetY + 30 + cellOffsetY,
        animated: true,
      });
      answerInputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (activeAnswer) {
      scrollToAnswer();
      initializeInputValue();
    } else {
      setInputValue("");
    }
  }, [activeAnswer]);

  const initializeInputValue = () => {
    let i = 0,
      value = "";
    let { x, y } = activeAnswer.cells[0];
    while (grid[y - 1][x - 1].locked) {
      value += grid[y - 1][x - 1].value;
      ({ x, y } = activeAnswer.cells[++i]);
    }
    setInputValue(value);
  };

  const handleShowAnswers = () => {
    dispatch(showAnswers());
    setSolutionShown(true);
  };

  const handleContinue = () => {
    props.onComplete();
  };

  const handleTouchAway = () => {
    Keyboard.dismiss();
    setInputValue("");
    dispatch(clearActiveAnswer());
  };

  const handleFocus = (i) => {
    setFocusedCell(i);
    dispatch(setActiveCell(activeAnswer.cells[i]));
  };

  const handleChange = (e) => {
    let inserted = false;
    let value = e.nativeEvent.text.toLowerCase();
    const prevValue = inputValue;

    // inserting character
    if (value.length > prevValue.length) {
      if (activeAnswer.cells.length > value.length) {
        const { x, y } = activeAnswer.cells[value.length];
        if (grid[y - 1][x - 1].locked) {
          value += grid[y - 1][x - 1].value;
          inserted = true;
        }
      }
      // deleting character
    } else {
      const { x, y } = activeAnswer.cells[value.length];
      if (grid[y - 1][x - 1].locked) {
        value = value.substr(0, value.length - 1);
      }
    }

    if (!/^[a-zA-ZÁÉÍÑÓÚÜáéíñóúü]*$/.test(value)) {
      return;
    }

    setInputValue(value);
    dispatch(updateAnswer(value));

    if (Platform.OS === "android" && inserted) {
      answerInputRef.current.blur();
      answerInputRef.current.focus();
    }
  };

  const handleReset = () => {
    dispatch(startCrossword(crosswordConfig));
  };

  const handleConfirm = () => {
    if (inputValue === activeAnswerText) {
      playSound(FEEDBACK_POSITIVE);
      dispatch(markAnswerCorrect(activeAnswerText));
    } else {
      animationRef.current?.shake();
      playSound(FEEDBACK_NEGATIVE);
    }
  };

  return initialized ? (
    <View>
      <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="always">
        <TouchableWithoutFeedback onPress={handleTouchAway}>
          <View style={styles.container}>
            <Clues words={props.words} />
            <Animatable.View
              ref={animationRef}
              onLayout={(event) => {
                gridOffsetY = event.nativeEvent.layout.y;
              }}
            >
              <Grid grid={grid} cellDimension={cellDimension} />
            </Animatable.View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.controlContainer}>
        {activeAnswer ? (
          <>
            <AppText style={styles.clue}>
              {wordsByText[activeAnswerText].translation}
            </AppText>
            <AppButton variant="small" onPress={handleConfirm}>
              Submit
            </AppButton>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              onChange={handleChange}
              ref={answerInputRef}
              style={styles.answerInput}
              maxLength={activeAnswerText.length}
              value={inputValue}
              onSubmitEditing={handleConfirm}
            />
          </>
        ) : (
          <>
            <AppText>
              {`Completed: ${completedCount} / ${props.words.length}`}
            </AppText>
            {/*{dirty && <AppButton onPress={handleReset}>Reset</AppButton>}*/}
            {/*{!submitted && !solutionShown && (*/}
            {/*  <AppButton variant="small" onPress={handleShowAnswers}>*/}
            {/*    Show solution*/}
            {/*  </AppButton>*/}
            {/*)}*/}
            {completedCount === props.words.length && (
              <AppButton variant="small" onPress={handleContinue}>
                Continue
              </AppButton>
            )}
          </>
        )}
      </View>
    </View>
  ) : (
    <AppText>Loading</AppText>
  );
};

const styles = StyleSheet.create({
  controlContainer: {
    backgroundColor: "#DDD",
    borderTopWidth: 2,
    borderTopColor: Colors.accent,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    height: 50,
    bottom: 0,
    width: "100%",
  },
  answerInput: {
    display: "none",
  },
  clue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    marginBottom: 50,
    paddingBottom: 20,
  },
});

export default Crossword;
